const CustomError = require("../utils/error.util");

module.exports = (err, _req, res, _next) => {
  if (err instanceof CustomError) {
    // Handle custom error
    const errStatus = err.status || 500;
    const errMessage = err.message || "Something went worng";
    return res.status(errStatus).json({
      status: errStatus,
      message: errMessage,
    });
  } else {
    // Handle other errorr
    const errStatus = err.status || 500;
    const errMessage = err.message || "Something went worng";
    return res.status(errStatus).json({
      status: errStatus,
      message: errMessage,
    });
  }
};
