const express = require("express");
const dotenv = require("dotenv/config");
const pinoLogger = require("pino-http");
const helmet = require("helmet");

// connect with database
require("./src/configs/database/mongodb");

const app = express();

app.use(helmet());

// logger
app.use(pinoLogger());

app.use(express.json());

app.use("/", require("./src/routes"));

// Error handling
app.use((err, req, res, next) => {
  return res.status(500).json({
    message: "Internal server error.",
  });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
