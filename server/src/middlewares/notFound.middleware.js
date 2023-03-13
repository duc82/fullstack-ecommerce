module.exports = (_req, _res, next) => {
  const error = new Error("Route không tồn tại");
  error.status = 404;
  next(error);
};
