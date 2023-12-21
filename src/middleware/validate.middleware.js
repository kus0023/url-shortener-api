const { validationResult } = require("express-validator");

exports.validateData = (req, res, next) => {
  const validateResult = validationResult(req);

  if (!validateResult.isEmpty()) {
    return res
      .status(400)
      .json(this.validationErrorResponse(validateResult.array()));
  }

  next();
};

exports.validationErrorResponse = (validationResult) => {
  const errors = validationResult.map((er) => {
    return er.msg;
  });

  return { errors };
};
