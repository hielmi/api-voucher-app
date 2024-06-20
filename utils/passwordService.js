import bcrypt from "bcrypt";

export const encryptPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

export const comparePassword = (plainTextPassword, encryptedPassword) => {
  return bcrypt.compare(plainTextPassword, encryptedPassword);
};
