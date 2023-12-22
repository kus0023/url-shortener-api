const express = require("express");

const routes = express.Router();

routes.use("/shorten", require("./weburl.route"));

routes.use("/auth", require("./auth.route"));

/**
 * This route will be public and can be used to access shorten URL.
 */
routes.use("/", require("./view.route"));

routes.get("/", (req, res, next) => {
  res.json({
    status: "ok",
    visit: "https://github.com/kus0023/url-shortener-api#readme",
    author: "Kumar Utsav Singh",
  });
});

routes.use("*", (req, res) => {
  res.status(404).json({
    message: "You are lost. No content is here.",
  });
});

module.exports = routes;
