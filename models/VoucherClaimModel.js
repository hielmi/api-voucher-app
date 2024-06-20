import { Sequelize } from "sequelize";
import dbConfig from "../config/db.js";
import Voucher from "./VoucherModel.js";
import User from "./UserModel.js";

const { DataTypes } = Sequelize;

const VoucherClaim = dbConfig.define(
  "Voucher_Claim",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    id_voucher: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Voucher,
        key: "id",
      },
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    tanggal_claim: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

export default VoucherClaim;
