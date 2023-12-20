const mongoose = require("mongoose");

const mongoURL = process.env.MONGODB_URL;
const databaseName = process.env.APP_DB_NAME || "shortify";

const mongoCompleteURL = mongoURL + databaseName;

mongoose
  .connect(mongoCompleteURL)
  .then(() => console.log("Connected to db!"))
  .catch((error) => {
    console.error("Database connection error: ", error);
  });
