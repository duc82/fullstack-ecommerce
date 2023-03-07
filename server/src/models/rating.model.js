const { DataTypes } = require("sequelize");
const sequelize = require("../configs/db.config");

const Rating = sequelize.define("Rating", {
  rating: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  name: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  title: {
    type: DataTypes.STRING,
  },
  comment: {
    type: DataTypes.STRING,
  },
});

module.exports = Rating;
