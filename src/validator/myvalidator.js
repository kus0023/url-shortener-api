const { body } = require("express-validator");

exports.validLogin = [
  body("email")
    .trim()
    .isEmail()
    .notEmpty()
    .withMessage("Email should be present."),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password should not be empty."),
];

exports.validRegistration = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email should be present.")
    .isEmail()
    .withMessage("Invalid email received."),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password should not be empty.")
    .isStrongPassword({ minLength: 8 })
    .withMessage(
      "Password should be strong. Minimum length should be 8. Atleast one upppercase, one lowercase, one Number should be present."
    ),
  body("name").trim().notEmpty().withMessage("Please provide your name."),
];

exports.validWebUrl = [
  body("originalURL")
    .trim()
    .notEmpty()
    .isURL()
    .withMessage("Please provide valid URL in (body.originalURL)"),
];
