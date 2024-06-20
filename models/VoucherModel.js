import { Sequelize } from "sequelize";
import dbConfig from "../config/db.js";

const DataTypes = Sequelize;

const Voucher = dbConfig.define(
  "Voucher",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    foto: {
      type: DataTypes.STRING,
    },
    kategori: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

export default Voucher;
