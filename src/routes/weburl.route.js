const express = require("express");
const authenticate = require("../middleware/authenticate.middleware");
const weburlController = require("../controller/weburl.controller");
const { validateData } = require("../middleware/validate.middleware");
const { validWebUrl } = require("../validator/myvalidator");

const routes = express.Router();

// It will return all the sorten URLs of User
routes.get("/", authenticate, weburlController.getAllUrls);

// It will verify and return sort URL.
routes.post(
  "/",
  authenticate,
  validWebUrl,
  validateData,
  weburlController.shorten
);

module.exports = routes;
