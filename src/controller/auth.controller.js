const { validationResult } = require("express-validator");
const { validationErrorResponse } = require("../helper/validation.error");
const userService = require("../service/UserService");

exports.login = async (req, res) => {
  const validateResult = validationResult(req);

  if (!validateResult.isEmpty()) {
    return res
      .status(400)
      .json(validationErrorResponse(validateResult.array()));
  }

  const { email, password } = req.body;

  const token = await userService.login(email, password);

  if (!token) {
    return res.status(400).json({
      message: "Invalid Credentials",
    });
  }

  return res.status(200).json({
    token,
    message: "success",
  });
};

exports.register = async (req, res) => {
  const validateResult = validationResult(req);

  if (!validateResult.isEmpty()) {
    return res
      .status(400)
      .json(validationErrorResponse(validateResult.array()));
  }

  const { name, email, password } = req.body;

  const userData = await userService.register({ name, email, password });

  if (!userData.user) {
    return res.status(400).json({
      message: userData.message,
    });
  }

  return res.status(201).json(userData);
};
