const express = require("express");
const authenticate = require("../middleware/authenticate.middleware");

const routes = express.Router();

// It will return all the sorten URLs of User
routes.get("/", authenticate, (req, res) => {
  res.json({ msg: "ok" });
});

// It will verify and return sort URL.
routes.post("/", (req, res) => {});

module.exports = routes;
