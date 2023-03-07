const { DataTypes } = require("sequelize");
const sequelize = require("../configs/db.config");

const Category = sequelize.define("Category", {
  title: {
    type: DataTypes.STRING,
  },
});

module.exports = Category;
