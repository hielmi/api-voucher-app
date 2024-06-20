import CustomError from "../utils/customError.js";

const roleMiddleware = (requiredRole) => {
  return (req, res, next) => {
    const user = req.user;

    if (!user || user.role !== requiredRole) {
      return next(
        new CustomError("Access denied. Insufficient permissions.", 403)
      );
    }

    next();
  };
};

export default roleMiddleware;
