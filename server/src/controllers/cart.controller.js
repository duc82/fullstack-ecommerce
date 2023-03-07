const asyncWrapper = require("../middlewares/asyncWrapper.middleware");
const Product = require("../models/product.model");
const crypto = require("crypto");
const Image = require("../models/image.model");
const Cart = require("../models/cart.model");
const CartItems = require("../models/cart_item.model");
const CustomError = require("../utils/error.util");
require("dotenv").config();

class CartController {
  static get getCart() {
    return asyncWrapper(async (req, res) => {
      const uniqueid = req.cookies.cart;

      const cart = await Cart.findByPk(uniqueid, {
        include: [{ model: CartItems, as: "cartItems" }],
        order: [["cartItems", "createdAt", "asc"]],
      });

      if (!cart) {
        res.clearCookie("cart");
        throw new CustomError({
          message: "không có sản phẩm nào trong giỏ hàng",
          status: 404,
        });
      }

      res.status(200).json({
        ...cart.dataValues,
      });
    });
  }

  static get addCart() {
    return asyncWrapper(async (req, res) => {
      const { productId, quantity } = req.body;

      if (!(productId || quantity)) {
        throw new CustomError({
          message: "Vui lòng cung cấp id sản phẩm và số lượng sản phẩm",
          status: 400,
        });
      }

      const uniqueid =
        req.cookies.cart || crypto.randomBytes(32).toString("hex");

      const product = await Product.findByPk(productId, {
        attributes: ["name", "cost", "slug", "bonus"],
        include: [
          {
            model: Image,
            as: "images",
            attributes: ["src"],
          },
        ],
      });

      if (!product) {
        throw new CustomError({
          message: `Không tìm thấy sản phẩm với id: ${productId}`,
          status: 404,
        });
      }

      const [cart, _created] = await Cart.findOrCreate({
        where: {
          id: uniqueid,
        },
        defaults: {
          id: uniqueid,
        },
      });

      const cartItem = await CartItems.findOne({
        where: {
          productId,
          cartId: cart.id,
        },
      });

      if (cartItem) {
        cartItem.quantity += 1;
        await cartItem.save();
      } else {
        await CartItems.create({
          productId,
          name: product.bonus
            ? `${product.name} - ${product.bonus}`
            : product.name,
          slug: product.slug,
          cost: product.cost,
          image: product.images[1].src,
          quantity,
          cartId: uniqueid,
        });
      }

      const date = new Date(Date.now());
      date.setDate(date.getDate() + 1);
      res.cookie("cart", uniqueid, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        expires: date,
      });

      const carts = await Cart.findByPk(uniqueid, {
        include: [
          {
            model: CartItems,
            as: "cartItems",
          },
        ],
        order: [["cartItems", "createdAt", "asc"]],
      });

      res.status(200).json({
        message: `Bạn đã thêm ${product.name} vào giỏ hàng`,
        ...carts.get({ plain: true }),
      });
    });
  }
}

module.exports = CartController;
