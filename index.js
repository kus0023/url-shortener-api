const express = require("express");
const dotenv = require("dotenv/config");
const pinoLogger = require("pino-http");
const helmet = require("helmet");

// connect with database if not testing

if (process.env.NODE_ENV !== "test") {
  require("./src/configs/database/mongodb");
}
const app = express();

app.use(helmet());

// logger
if (process.env.NODE_ENV !== "test") {
  app.use(
    pinoLogger({
      autoLogging: {
        ignore: function (req) {
          if (req.url === "/health/check") {
            return true;
          }
          return false;
        },
      },
    })
  );
}

app.use(express.json());

app.use("/", require("./src/routes"));

// Error handling
app.use((err, req, res, next) => {
  return res.status(500).json({
    message: "Internal server error.",
  });
});

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  if (process.env.NODE_ENV !== "test") {
    console.log("Server running on port", PORT);
  }
});

module.exports = { app, server };
