import Voucher from "../models/VoucherModel.js";
import { responseSuccess } from "../utils/responseTemplate.js";
import CustomError from "../utils/customError.js";
import { removeOldFoto } from "../utils/removeFile.js";

export const getAllVouchers = async (req, res, next) => {
  const vouchers = await Voucher.findAll();

  responseSuccess(res, 200, "Success get all Vouchers", vouchers);
};

export const getVoucher = async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    throw new CustomError("Query id must be filled");
  }

  const voucher = await Voucher.findOne({
    where: {
      id: id,
    },
  });

  if (!voucher) {
    throw new CustomError("Voucher doesn't exist", 400);
  }

  responseSuccess(res, 200, "Success get voucher", [voucher]);
};

export const addVoucher = async (req, res, next) => {
  const foto = req?.file?.filename || null;
  const { nama, kategori } = req.body;

  try {
    if (!(nama && kategori)) {
      throw new CustomError("nama and kategori must be filled", 400);
    }

    const newVoucher = await Voucher.create({
      nama,
      kategori,
      foto,
      status: false,
    });

    if (!newVoucher) {
      throw new CustomError("Failed to add voucher, something wrong", 400);
    }

    responseSuccess(res, 201, "Success add voucher", [newVoucher]);
  } catch (error) {
    next(error);
  }
};

export const updateVoucher = async (req, res, next) => {
  const foto = req?.file?.filename || null;
  const { id } = req.params;
  const { nama, kategori } = req.body;

  try {
    if (!id) {
      throw new CustomError("Voucher ID must be provided", 400);
    }
    if (!(nama || kategori || foto)) {
      throw new CustomError(
        "At least one field (nama, kategori, or foto) must be provided to update",
        400
      );
    }

    // hapus foto lama
    if (foto) {
      const voucher = await Voucher.findOne({
        where: {
          id: id,
        },
      });

      if (!voucher) {
        throw new CustomError("Voucher doesn't exist", 400);
      }

      if (voucher.foto) {
        const removeFoto = removeOldFoto(voucher.foto);
        if (!removeFoto) {
          throw new CustomError(
            "Failed to update voucher, something error",
            500
          );
        }
      }
    }

    const updateFields = {};
    if (nama) updateFields.nama = nama;
    if (kategori) updateFields.kategori = kategori;
    if (foto) updateFields.foto = foto;

    const updatedVoucher = await Voucher.update(updateFields, {
      where: {
        id: id,
      },
    });

    if (updateVoucher[0] === 0) {
      throw new CustomError(
        "Failed to update voucher, the voucher doesn't exist"
      );
    }
    const voucher = await Voucher.findOne({
      where: {
        id: id,
      },
    });

    if (!updatedVoucher) {
      throw new CustomError("Failed to update voucher", 400);
    }

    responseSuccess(res, 200, "Success updated voucher", [voucher]);
  } catch (error) {
    next(error);
  }
};

export const deleteVoucher = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (!id) {
      throw new CustomError("Query id must be fill", 400);
    }

    const voucher = await Voucher.findOne({
      where: {
        id: id,
      },
    });

    if (!voucher) {
      throw new CustomError("Vohcer doesn't exist", 400);
    }

    //remove foto
    if (voucher.foto) {
      const removeFoto = removeOldFoto(voucher.foto);
      if (!removeFoto) {
        throw new CustomError("Failed to delete voucher", 400);
      }
    }

    const deletedVoucher = await Voucher.destroy({
      where: {
        id: id,
      },
    });

    if (!deletedVoucher) {
      throw new CustomError("Failed to delete voucher, something error", 500);
    }

    responseSuccess(res, 200, "Success deleted voucher");
  } catch (error) {
    next(error);
  }
};
