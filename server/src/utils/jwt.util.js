const jwt = require("jsonwebtoken");
const CustomError = require("./error.util");

const generateTokenJWT = (payload, jwtSecret, expiresIn) => {
  try {
    return jwt.sign(payload, jwtSecret, { expiresIn });
  } catch (error) {
    throw new CustomError({
      status: 500,
      message: error.message,
    });
  }
};

const verifyTokenJWT = (token, jwtSecret) => {
  try {
    return jwt.verify(token, jwtSecret);
  } catch (error) {
    console.log(error);
    throw new CustomError({
      status: 500,
      message: error.message,
    });
  }
};

module.exports = {
  generateTokenJWT,
  verifyTokenJWT,
};
