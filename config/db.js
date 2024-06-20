import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const dbConfig = new Sequelize("horus_hielmi_db", "root", "", {
  host: "localhost",
  dialect: "mysql",
  timezone: "+07:00",
  logging: process.env.NODE_ENV === "production" ? false : console.log,
  dialectOptions: {
    useUTC: false,
    timezone: "+07:00",
  },
});

try {
  console.log(
    `Connection to the database with ${
      process.env.NODE_ENV === "production" ? "production" : "development"
    } mode has been established successfully.`
  );
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

export default dbConfig;
