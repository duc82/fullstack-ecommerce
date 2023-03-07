const CustomError = require("../utils/error.util");
const asyncWrapperMiddleware = require("../middlewares/asyncWrapper.middleware");
const bcrypt = require("bcryptjs");
const sendMail = require("../utils/sendMail.util");
const crypto = require("crypto");
const { Op } = require("sequelize");
const { generateTokenJWT, verifyTokenJWT } = require("../utils/jwt.util");
const User = require("../models/user.model");
require("dotenv").config();

const accessTokenSecret = process.env.SECRET_KEY_ACCESS_TOKEN;
const accessTokenExpiresIn = "15m";
const refreshTokenSecret = process.env.SECRET_KEY_REFRESH_TOKEN;
const refreshTokenExpiresIn = "1d";

class AuthController {
  static get signUp() {
    return asyncWrapperMiddleware(async (req, res) => {
      const { fullName, phone, email, password } = req.body;

      if (!(fullName || phone || email || password)) {
        throw new CustomError({
          status: 400,
          message: "Vui lòng nhập tất cả thông tin.",
        });
      }

      const existAccount = await User.findOne({
        where: {
          email,
        },
      });

      if (existAccount) {
        throw new CustomError({
          status: 400,
          message: "Email này đã được đăng ký.",
        });
      }

      await User.create(req.body);

      res.status(201).json({
        message: "Đăng ký tài khoản thành công!",
      });
    });
  }

  static get signIn() {
    return asyncWrapperMiddleware(async (req, res) => {
      const { email, password } = req.body;

      if (!(email || password)) {
        throw new CustomError({
          status: 400,
          message: "Vui lòng nhập tất cả thông tin.",
        });
      }

      const user = await User.findOne({
        where: {
          email,
        },
        attributes: ["id", "email", "password", "role"],
      });

      if (!user) {
        throw new CustomError({
          status: 400,
          message: "Email hoặc mật khẩu không hợp lệ",
        });
      }

      const isPassowrdCorrect = await bcrypt.compare(password, user.password);

      if (!isPassowrdCorrect) {
        throw new CustomError({
          status: 400,
          message: "Email hoặc mật khẩu không hợp lệ",
        });
      }

      const payload = {
        userId: user.id,
        role: user.role,
      };

      const accessToken = generateTokenJWT(
        payload,
        accessTokenSecret,
        accessTokenExpiresIn
      );

      const refreshToken = generateTokenJWT(
        payload,
        refreshTokenSecret,
        refreshTokenExpiresIn
      );

      const date = new Date(Date.now());
      date.setDate(date.getDate() + 1);

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "Lax",
        expires: date,
      });

      res.status(200).json({
        message: "Đăng nhập tài khoản thành công!",
        accessToken,
      });
    });
  }

  static get refreshToken() {
    return asyncWrapperMiddleware(async (req, res) => {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) {
        throw new CustomError({
          status: 401,
          message: "Bạn chưa đăng nhập tài khoản.",
        });
      }

      const decoded = verifyTokenJWT(refreshToken, refreshTokenSecret);

      const { iat, exp, ...payloadUser } = decoded;

      const newAccessToken = generateTokenJWT(
        payloadUser,
        accessTokenSecret,
        accessTokenExpiresIn
      );
      const newRefreshToken = generateTokenJWT(
        payloadUser,
        refreshTokenSecret,
        refreshTokenExpiresIn
      );

      const date = new Date(Date.now());
      date.setDate(date.getDate() + 1);

      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Lax",
        expires: date,
      });

      res.status(200).json({
        message: "Lấy thành công access token mới.",
        accessToken: newAccessToken,
      });
    });
  }

  static get signOut() {
    return asyncWrapperMiddleware(async (req, res) => {
      res.clearCookie("refreshToken");
      res.status(200).json({
        message: "Đăng xuất tài khoản thành công.",
      });
    });
  }

  static get forgotPassword() {
    return asyncWrapperMiddleware(async (req, res) => {
      const { email } = req.body;
      const user = await User.findOne({
        where: {
          email,
        },
        attributes: [
          "id",
          "fullName",
          "email",
          "passwordToken",
          "passwordTokenExpirationDate",
        ],
      });

      if (!user) {
        throw new CustomError({
          status: 404,
          message: "Không tìm thấy tài khoản!",
        });
      }

      const token = crypto.randomBytes(32).toString("hex");
      const verifyLink = `${process.env.ORIGIN_CLIENT}/doi-mat-khau?email=${user.email}&token=${token}`;

      user.id = user.id;
      user.passwordToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");
      const tenMinutes = 1000 * 60 * 10;
      user.passwordTokenExpirationDate = new Date(Date.now() + tenMinutes);
      await user.save();

      await sendMail({
        to: user.email,
        subject: "Thiết lập lại mật khẩu của tài khoản khách hàng",
        fullName: user.fullName,
        origin_client: process.env.ORIGIN_CLIENT,
        verifyLink,
      }).catch((error) => console.log(error));

      res.status(200).json({
        message: "Gửi mail đổi mật khẩu thành công!",
      });
    });
  }

  static get verifyRecovery() {
    return asyncWrapperMiddleware(async (req, res) => {
      const { email, token } = req.body;

      if (!(email || token)) {
        throw new CustomError({
          status: 400,
          message: "Đường link không hợp lệ hoặc đã hết hạn",
        });
      }

      const user = await User.findOne({
        where: {
          email,
          passwordToken: crypto
            .createHash("sha256")
            .update(token)
            .digest("hex"),
          passwordTokenExpirationDate: {
            [Op.gt]: new Date(Date.now()),
          },
        },
        attributes: ["id"],
      });

      if (!user) {
        throw new CustomError({
          status: 400,
          message: "Đường link không hợp lệ hoặc đã hết hạn",
        });
      }

      res.status(200).json({
        message: "Xác minh phục hồi thành công",
      });
    });
  }

  static get resetPassword() {
    return asyncWrapperMiddleware(async (req, res) => {
      const { token, email, password } = req.body;
      if (!(token || email || password)) {
        throw new CustomError({
          status: 400,
          message: "Vui lòng nhập tất cả thông tin",
        });
      }

      const user = await User.findOne({
        where: {
          email,
          passwordToken: crypto
            .createHash("sha256")
            .update(token)
            .digest("hex"),
          passwordTokenExpirationDate: {
            [Op.gt]: new Date(Date.now()),
          },
        },
        attributes: [
          "id",
          "password",
          "passwordToken",
          "passwordTokenExpirationDate",
        ],
      });

      if (!user) {
        throw new CustomError({
          status: 400,
          message: "Đường link không hợp lệ hoặc đã hết hạn",
        });
      }
      user.id = user.id;
      user.password = password;
      user.passwordToken = null;
      user.passwordTokenExpirationDate = null;
      await user.save();

      res.status(200).json({
        message: "Đổi mật khẩu thành công.",
      });
    });
  }
}

module.exports = AuthController;
