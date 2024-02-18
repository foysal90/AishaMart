const { body } = require("express-validator");

//registration validations
const validateUserRegistration = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3, max: 21 })
    .withMessage("Name length should be between 3-21 characters long"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email address"),
  body("phone").trim().notEmpty().withMessage("phone is required"),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 6 })
    .withMessage("password length should beat least 6 characters long")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/
    )
    .withMessage(
      "Password must have at least one upperCase letter, one lowerCase letter, one number and one special character"
    ),
  body("image").optional().isString().withMessage("user image is optional"),
];

module.exports = { validateUserRegistration };
