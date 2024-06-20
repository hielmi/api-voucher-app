import fs from "fs";

export const removeOldFoto = (filename) => {
  try {
    fs.unlinkSync(`./public/images/${filename}`);
    return true;
  } catch (err) {
    console.error(`Error while deleting ${filename}:`, err);
    return false;
  }
};
