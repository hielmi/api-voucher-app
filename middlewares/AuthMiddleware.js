import { verifyAccessToken } from "../utils/tokenHelpers.js";
import { responseBadRequest } from "../utils/responseTemplate.js";

const AuthMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return responseBadRequest(res, 400, "No token provided!");
    }

    const user = verifyAccessToken(token);

    if (!user) {
      throw new Error("Unauthorized!");
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return responseBadRequest(res, 401, "Token expired!");
    }

    return responseBadRequest(res, 401, "Unautorized");
  }
};

export default AuthMiddleware;
