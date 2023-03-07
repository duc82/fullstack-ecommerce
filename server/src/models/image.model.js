const { DataTypes } = require("sequelize");
const sequelize = require("../configs/db.config");

const Image = sequelize.define(
  "Image",
  {
    src: DataTypes.STRING,
    alt: DataTypes.STRING,
  },
  { timestamps: false }
);

module.exports = Image;
