import express from "express";
import {
  registerUser,
  loginUser,
  refreshToken,
} from "../controllers/AuthController.js";

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/refresh-token", refreshToken);

export default authRouter;
