import User from "../models/UserModel.js";
import { responseSuccess } from "../utils/responseTemplate.js";
import CustomError from "../utils/customError.js";

export const getProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const user = await User.findByPk(userId, {
      attributes: ["id", "username", "email", "nama", "role"],
    });

    if (!user) {
      throw new CustomError("User not found", 404);
    }

    responseSuccess(res, 200, "Success get profile", user);
  } catch (err) {
    next(err);
  }
};
