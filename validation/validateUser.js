const { body } = require("express-validator");

const spaceErr = "must have no spaces.";
const userLengthErr =
  "must be more than 3 characters and less than 16 characters.";
const passwordLengthErr = "must be at least 8 characters long.";
const mismatchErr =
  "must contain at least one uppercase letter, one lowercase letter, one number, and one symbol.";
const passwordErr = "Passwords don't match.";

const validateUser = [
  body("username")
    .custom((value) => !/\s/.test(value))
    .withMessage(`Username ${spaceErr}`)
    .isLength({ min: 4, max: 15 })
    .withMessage(`Username ${userLengthErr}`),
  body("password")
    .isLength({ min: 8 })
    .withMessage(`Password ${passwordLengthErr}`)
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).*$/)
    .withMessage(`Password ${mismatchErr}`),
  body("confirmPassword")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage(`${passwordErr}`),
];

module.exports = validateUser;
