const express = require("express");
const routes = express.Router();

const controller = require("../controller/auth.controller");
const { validLogin, validRegistration } = require("../validator/myvalidator");

routes.post("/login", validLogin, controller.login);

routes.post("/register", validRegistration, controller.register);

module.exports = routes;
