const express = require("express");
const { visit } = require("../controller/visit.controller");

const routes = express.Router();

routes.all("/:uniqueUrlParam", visit);

module.exports = routes;
