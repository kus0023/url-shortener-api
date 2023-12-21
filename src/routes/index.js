const express = require("express");

const routes = express.Router();

routes.use("/shorten", require("./weburl.route"));

routes.use("/auth", require("./auth.route"));

/**
 * This route will be public and can be used to access shorten URL.
 */
routes.use("/", require("./view.route"));

module.exports = routes;
