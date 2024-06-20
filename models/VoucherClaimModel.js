import { Sequelize } from "sequelize";
import dbConfig from "../config/db.js";

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
