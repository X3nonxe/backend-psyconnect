const handleError = (res, statusCode, message, error = null) => {
  console.error(message, error);
  res.status(statusCode).json({
    status: 'error',
    message: message,
    error: process.env.NODE_ENV === 'development' ? error : undefined,
  });
};

module.exports = handleError;
