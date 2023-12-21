const express = require("express");
const dotenv = require("dotenv/config");
const morgan = require("morgan");

// connect with database
require("./src/configs/database/mongodb");

const app = express();

// logger
const logger = morgan("dev");
app.use(logger);

app.use(express.json());

app.use("/", require("./src/routes"));

// Error handling
app.use((err, req, res) => {
  console.log(err);
  return res.status(500).json({
    message: "Something went wrong.",
  });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
