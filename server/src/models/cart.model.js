const { DataTypes } = require("sequelize");
const sequelize = require("../configs/db.config");
const CartItems = require("./cart_item.model");

const Cart = sequelize.define("Cart", {
  id: { type: DataTypes.STRING, primaryKey: true },
});

Cart.hasMany(CartItems, {
  as: "cartItems",
  foreignKey: "cartId",
});

CartItems.belongsTo(Cart, {
  foreignKey: "cartId",
});

module.exports = Cart;
