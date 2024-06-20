import express from "express";
import {
  addVoucher,
  deleteVoucher,
  getAllVouchers,
  getVoucher,
  updateVoucher,
} from "../controllers/VoucherController.js";
import { claimVoucer, unclaimVoucher } from "../controllers/ClaimController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";
import roleValidation from "../middlewares/RoleValidation.js";
import UploadMiddleware from "../middlewares/UploadMiddleware.js";

const voucherRouter = express.Router();

// public route
voucherRouter.get("/vouchers", getAllVouchers);

// protected route
voucherRouter.get("/voucher/:id", AuthMiddleware, getVoucher);
voucherRouter.post(
  "/voucher",
  AuthMiddleware,
  roleValidation("admin"),
  UploadMiddleware.single("foto"),
  addVoucher
);

voucherRouter.put(
  "/voucher/:id",
  AuthMiddleware,
  roleValidation("admin"),
  UploadMiddleware.single("foto"),
  updateVoucher
);

voucherRouter.delete(
  "/voucher/:id",
  AuthMiddleware,
  roleValidation("admin"),
  deleteVoucher
);

// claim and unclaim voucher
voucherRouter.post("/claim-voucher", AuthMiddleware, claimVoucer);
voucherRouter.delete("/unclaim-voucher/:id", AuthMiddleware, unclaimVoucher);

export default voucherRouter;
