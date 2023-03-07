const sequelize = require("../configs/db.config");
const { DataTypes } = require("sequelize");

const beforeCreateAndUpdate = (cartItems) => {
  cartItems.totalCost = cartItems.cost * cartItems.quantity;
};

const CartItems = sequelize.define(
  "CartItems",
  {
    productId: { type: DataTypes.INTEGER },
    name: { type: DataTypes.STRING },
    slug: { type: DataTypes.STRING },
    image: { type: DataTypes.STRING },
    cost: { type: DataTypes.INTEGER },
    quantity: { type: DataTypes.INTEGER },
    totalCost: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    hooks: {
      beforeCreate: beforeCreateAndUpdate,
      beforeUpdate: beforeCreateAndUpdate,
    },
  }
);

module.exports = CartItems;
