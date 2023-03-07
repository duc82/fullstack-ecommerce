const { DataTypes } = require("sequelize");
const sequelize = require("../configs/db.config");
const toLowerCaseNonAccentVietnamese = require("../utils/nonAccentVietnamese.util");
const Rating = require("./rating.model");
const Category = require("./category.model");
const Image = require("./image.model");
require("pg").defaults.parseInt8 = true;

const beforeCreateAndUpdate = (product) => {
  product.slug = toLowerCaseNonAccentVietnamese(product.name)
    .toLowerCase()
    .replace("/", " ")
    .split(" ")
    .join("-");
  product.cost = product.price - (product.price * product.discount) / 100;
  product.status = product.stock < 1 ? "Hết hàng" : "Còn hàng";
};

const Product = sequelize.define(
  "Product",
  {
    name: {
      type: DataTypes.STRING,
    },
    slug: {
      type: DataTypes.STRING,
    },
    brand: {
      type: DataTypes.STRING,
    },
    model: {
      type: DataTypes.STRING,
    },
    desc: {
      type: DataTypes.TEXT,
    },
    bonus: {
      type: DataTypes.STRING,
    },
    currency: {
      type: DataTypes.STRING,
      defaultValue: "VND",
    },
    status: {
      type: DataTypes.ENUM,
      values: ["Còn hàng", "Hết hàng"],
    },
    stock: {
      type: DataTypes.INTEGER,
    },
    discount: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    price: {
      type: DataTypes.INTEGER,
    },
    cost: {
      type: DataTypes.INTEGER,
    },
    sold: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    avgRating: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    thumbnail: {
      type: DataTypes.STRING,
    },
  },

  {
    hooks: {
      beforeCreate: beforeCreateAndUpdate,
      beforeUpdate: beforeCreateAndUpdate,
    },
  }
);

Product.hasMany(Image, {
  as: "images",
  foreignKey: "productId",
});
Image.belongsTo(Product, {
  foreignKey: "productId",
});

Product.hasMany(Rating, {
  as: "ratings",
  foreignKey: "productId",
});

Rating.belongsTo(Product, {
  foreignKey: "productId",
});

Product.hasMany(Category, {
  as: "categories",
  foreignKey: "productId",
});

Category.belongsTo(Product, {
  foreignKey: "productId",
});

module.exports = Product;
