const express = require("express");

const routes = express.Router();

/**
 * This route will be public and can be used to access shorten URL.
 */
routes.use("/v", require("./view.route"));

routes.use("/shorten", require("./weburl.route"));

routes.use("/", require("./auth.route"));

module.exports = routes;
