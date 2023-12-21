const { body } = require("express-validator");

exports.validLogin = [
  body("email").trim().isEmail().notEmpty().withMessage("Invalid Email"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password should not be empty.")
    .isStrongPassword({ minLength: 8 })
    .withMessage(
      "Password should be strong. Minimum length should be 8. Atleast one upppercase, one lowercase, one Number should be present."
    ),
  // .isLength({ min: 8, max: 20 })
  // .withMessage("Invalid password"),
];
