import CustomError from "../utils/customError.js";
import VoucherClaim from "../models/VoucherClaimModel.js";
import { responseSuccess } from "../utils/responseTemplate.js";
import Voucher from "../models/VoucherModel.js";

export const claimVoucerController = async (req, res, next) => {
  try {
    const { id } = req.body;

    const id_user = req.user.id;

    if (!id) {
      throw new CustomError("id voucher must be fill", 400);
    }

    const claimedVoucher = await VoucherClaim.create({
      id_voucher: id,
      id_user,
      tanggal_claim: new Date(),
    });

    await Voucher.update(
      { status: true },
      {
        where: {
          id: id,
        },
      }
    );

    if (!claimedVoucher) {
      throw new CustomError("Failed claim voucher", 400);
    }

    responseSuccess(res, 201, "Success claimed voucher", [claimedVoucher]);
  } catch (err) {
    next(err);
  }
};

export const unclaimVoucherController = async (req, res, next) => {
  const { id } = req.query;
  try {
    if (!id) {
      throw new CustomError("id voucher must be fill", 400);
    }

    const unclaimedVoucher = await VoucherClaim.destroy({
      where: {
        id: id,
      },
    });

    await Voucher.update(
      { status: false },
      {
        where: {
          id: id,
        },
      }
    );

    if (!unclaimedVoucher) {
      throw new CustomError("Failed remove claimed voucher", 400);
    }

    responseSuccess(res, 200, "Success unclaim voucher");
  } catch (err) {
    next(err);
  }
};
