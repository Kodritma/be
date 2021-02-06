module.exports = function ({ statusCode = 500, errorMessage }, req, res, next) {
  res.status(statusCode).json({ errorMessage });
};
