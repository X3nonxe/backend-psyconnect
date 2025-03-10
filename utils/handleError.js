const handleError = (res, statusCode, message, error = null) => {
  res.status(statusCode).json({ message, error });
};

module.exports = handleError;