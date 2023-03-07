const asyncWrapperMiddleware = require("../middlewares/asyncWrapper.middleware");
const User = require("../models/user.model");
const CustomError = require("../utils/error.util");

class UserController {
  static get getMe() {
    return asyncWrapperMiddleware(async (req, res) => {
      const { userId } = req.user;
      if (!userId) {
        throw new CustomError({
          status: 401,
          message: "Bạn chưa đăng nhập tài khoản",
        });
      }

      const user = await User.findByPk(userId, {
        attributes: {
          exclude: ["password"],
        },
      });

      res.status(200).json({ ...user.get({ plain: true }) });
    });
  }
}

module.exports = UserController;
