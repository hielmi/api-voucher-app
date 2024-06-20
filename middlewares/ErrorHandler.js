const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const customMessage = err.customMessage || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    message: customMessage,
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  });
};

export default errorHandler;
