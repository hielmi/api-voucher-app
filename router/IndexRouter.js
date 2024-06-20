import express from "express";
import authRouter from "./AuthRouter.js";
import voucherRouter from "./VoucherRouter.js";
import userRouter from "./UserRouter.js";

const router = express.Router();

// auth route
router.use("/auth", authRouter);

// user route
router.use("/", userRouter);

// voucher route
router.use("/", voucherRouter);

export default router;
