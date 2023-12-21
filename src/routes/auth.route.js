const express = require("express");
const routes = express.Router();

const controller = require("../controller/auth.controller");
const { validLogin, validRegistration } = require("../validator/myvalidator");
const { validateData } = require("../middleware/validate.middleware");

routes.post("/login", validLogin, validateData, controller.login);

routes.post("/register", validRegistration, validateData, controller.register);

module.exports = routes;
