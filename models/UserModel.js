import { Sequelize } from "sequelize";
import dbConfig from "../config/db.js";

const { DataTypes } = Sequelize;

const User = dbConfig.define(
  "User",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tanggal_daftar: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM,
      values: ["member", "admin"],
      defaultValue: "member",
      allowNull: false,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

export default User;
