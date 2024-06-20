import express from "express";
import { getProfile } from "../controllers/UserController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";

const userRouter = express.Router();

userRouter.get("/profile", AuthMiddleware, getProfile);

export default userRouter;
