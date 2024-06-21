import CustomError from "../utils/customError.js";
import VoucherClaim from "../models/VoucherClaimModel.js";
import { responseSuccess } from "../utils/responseTemplate.js";
import Voucher from "../models/VoucherModel.js";

export const claimVoucer = async (req, res, next) => {
  try {
    const { id } = req.body;
    const id_user = req.user.id;

    if (!id) {
      throw new CustomError("ID voucher must be filled", 400);
    }

    const voucher = await Voucher.findByPk(id);

    if (!voucher) {
      throw new CustomError("Voucher not found", 404);
    }

    if (voucher.status === true) {
      throw new CustomError("Voucher already claimed", 400);
    }

    const data = {
      id_voucher: id,
      id_user,
      tanggal_claim: new Date(),
    };

    const claimedVoucher = await VoucherClaim.create(data);

    await Voucher.update(
      { status: true },
      {
        where: {
          id: id,
        },
      }
    );

    responseSuccess(res, 201, "Successfully claimed voucher", [claimedVoucher]);
  } catch (err) {
    next(err);
  }
};

export const unclaimVoucher = async (req, res, next) => {
  const { id } = req.params;
  const id_user = req.user.id;

  try {
    if (!id) {
      throw new CustomError("ID voucher must be filled", 400);
    }

    const voucherClaim = await VoucherClaim.findByPk(id);

    if (!voucherClaim) {
      throw new CustomError("Claim not found", 404);
    }

    const idVoucher = voucherClaim.id_voucher;

    await VoucherClaim.destroy({
      where: {
        id: id,
        id_user,
      },
    });

    await Voucher.update(
      { status: false },
      {
        where: {
          id: idVoucher,
        },
      }
    );

    responseSuccess(res, 200, "Successfully unclaimed voucher");
  } catch (err) {
    next(err);
  }
};
