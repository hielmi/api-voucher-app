import express from "express";
import {
  addVoucher,
  deleteVoucher,
  getAllVouchers,
  getVoucher,
  updateVoucher,
} from "../controllers/VoucherController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";
import roleValidation from "../middlewares/RoleValidation.js";
import UploadMiddleware from "../middlewares/UploadMiddleware.js";

const voucherRouter = express.Router();

// public route
voucherRouter.get("/vouchers", getAllVouchers);

// protected route
voucherRouter.get("/voucher", AuthMiddleware, getVoucher);
voucherRouter.post(
  "/voucher",
  AuthMiddleware,
  roleValidation("admin"),
  UploadMiddleware.single("foto"),
  addVoucher
);

voucherRouter.put(
  "/voucher",
  AuthMiddleware,
  roleValidation("admin"),
  UploadMiddleware.single("foto"),
  updateVoucher
);

voucherRouter.delete(
  "/voucher",
  AuthMiddleware,
  roleValidation("admin"),
  deleteVoucher
);

export default voucherRouter;
