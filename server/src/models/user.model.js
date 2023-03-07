const { DataTypes } = require("sequelize");
const sequelize = require("../configs/db.config");
const bcrypt = require("bcryptjs");

const hashPassword = async (user) => {
  if (user.changed("password")) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
  }
};

const User = sequelize.define(
  "User",
  {
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 25],
      },
    },
    phone: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        is: /([3|5|7|8|9])+([0-9]{8})\b/,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    role: {
      type: DataTypes.ENUM,
      values: ["admin", "user"],
      defaultValue: "user",
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [8, 100],
          msg: "Mật khẩu tối thiểu 8 kí tự, tối đa 100 kí tự",
        },
      },
    },
    passwordToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    passwordTokenExpirationDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    hooks: {
      beforeCreate: hashPassword,
      beforeUpdate: hashPassword,
    },
  }
);

module.exports = User;
