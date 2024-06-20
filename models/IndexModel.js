import Sequelize from "sequelize";
import dbConfig from "../config/db.js";

import User from "./UserModel.js";
import Voucher from "./VoucherModel.js";
import VoucherClaim from "./VoucherClaimModel.js";

const db = {};

db.Sequelize = Sequelize;
db.dbConfig = dbConfig;

db.User = User;
db.Voucher = Voucher;
db.VoucherClaim = VoucherClaim;

db.User.hasMany(db.VoucherClaim, {
  foreignKey: "id_user",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.Voucher.hasMany(db.VoucherClaim, {
  foreignKey: "id_voucher",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.VoucherClaim.belongsTo(db.User, {
  foreignKey: "id_user",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.VoucherClaim.belongsTo(db.Voucher, {
  foreignKey: "id_voucher",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

export default db;
