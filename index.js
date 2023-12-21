const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

// Using env variables
dotenv.config();

// connect with database
require("./src/configs/database/mongodb");

const app = express();

// logger
const logger = morgan("dev");
app.use(logger);

app.use(express.json());

app.use("/", require("./src/routes"));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
