module.exports = (_req, _res, next) => {
  const error = new Error("Route không tồn tại");
  error.statusCode = 404;
  next(error);
};
