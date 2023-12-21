const express = require("express");
const routes = express.Router();

const controller = require("../controller/auth.controller");
const { validLogin } = require("../validator/auth.valid");

routes.post("/login", validLogin, controller.login);

routes.post("/register", controller.register);

module.exports = routes;
