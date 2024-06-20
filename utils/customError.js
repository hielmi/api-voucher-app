class CustomError extends Error {
  constructor(customMessage, statusCode) {
    super(customMessage);
    this.customMessage = customMessage;
    this.statusCode = statusCode;
  }
}

export default CustomError;
