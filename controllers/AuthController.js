import { Op } from "sequelize";
import CustomError from "../utils/customError.js";
import User from "../models/UserModel.js";
import { encryptPassword, comparePassword } from "../utils/passwordService.js";
import {
  responseSuccess,
  responseSuccessWithToken,
} from "../utils/responseTemplate.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/tokenHelpers.js";

export const registerUser = async (req, res, next) => {
  const { username, password, email, nama } = req.body;

  try {
    if (!(username && password && email && nama)) {
      throw new CustomError(
        `Please fill all the fields, Require username, password, email, nama `,
        400
      );
    }

    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ username }, { email }],
      },
    });

    if (existingUser?.username === username) {
      throw new CustomError("Username already taken", 409);
    } else if (existingUser?.email === email) {
      throw new CustomError("Email already taken", 409);
    }
    const newUser = {
      username,
      email,
      password: encryptPassword(password),
      nama,
      tanggal_daftar: new Date(),
      role: "member",
    };
    const result = await User.create(newUser);

    if (!result) {
      throw new Error("Internal server error");
    }

    return responseSuccess(res, 201, "Success created user");
  } catch (err) {
    next(err);
  }
};

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!(password && email)) {
      throw new CustomError(
        `Please fill all the fields, Require email and password `,
        400
      );
    }

    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ username: email }, { email }],
      },
    });

    if (!existingUser) {
      throw new CustomError("Email or username doesn't exist", 400);
    }

    const comparedPassword = await comparePassword(
      password,
      existingUser.password
    );
    if (!comparedPassword) {
      throw new CustomError("Password wrong", 400);
    }

    const data = {
      id: existingUser.id,
      email: existingUser.email,
      username: existingUser.username,
      nama: existingUser.nama,
      role: existingUser.role,
    };

    const accessToken = generateAccessToken(data);
    const refreshToken = generateRefreshToken(data);
    return responseSuccessWithToken(
      res,
      200,
      "Success login user",
      accessToken,
      refreshToken,
      [data]
    );
  } catch (err) {
    next(err);
  }
};

export const refreshToken = async (req, res, next) => {
  const { refreshToken } = req.body;

  try {
    if (!refreshToken) {
      throw new CustomError("Refresh Token must be sent", 400);
    }

    const user = verifyRefreshToken(refreshToken);

    if (!user) {
      throw new CustomError(
        "Your session has expired, please log in again",
        401
      );
    }

    const data = {
      id: user.id,
      email: user.email,
      username: user.username,
      nama: user.nama,
      role: user.role,
    };

    const accessToken = generateAccessToken(data);

    responseSuccessWithToken(
      res,
      201,
      "Your access token has been refreshed",
      accessToken,
      refreshToken
    );
  } catch (error) {
    next(error);
  }
};
