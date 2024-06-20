import express from "express";
import bodyparser from "body-parser";
import dbConfig from "./config/db.js";
import dotenv from "dotenv";
import errorHandler from "./middlewares/ErrorHandler.js";
import router from "./router/IndexRouter.js";

dotenv.config();

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// route
app.use("/api", router);

// middleware
app.use(errorHandler);

const startServer = async () => {
  await dbConfig.authenticate();
  const PORT = process.env.PORT || 4000;
  const HOST = process.env.NODE_ENV === "production" ? "0.0.0.0" : "localhost";

  app.listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}`);
  });
};

startServer();
