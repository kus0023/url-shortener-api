const mongoose = require("mongoose");

let mongoURL = process.env.MONGODB_URL_DEV;
const databaseName = process.env.APP_DB_NAME || "shortify";

if (process.env.NODE_ENV === "production") {
  console.log("Connecting to production database");
  mongoURL = process.env.MONGODB_URL;
}

const mongoCompleteURL = mongoURL + databaseName;

mongoose
  .connect(mongoCompleteURL)
  .then(() => console.log("Connected to db!"))
  .catch((error) => {
    console.error("Database connection error: ", error);
  });
