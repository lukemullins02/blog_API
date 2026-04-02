const { body } = require("express-validator");

const textLength = "must be between 1 and 280 characters.";

const validateComment = [
  body("text")
    .isLength({ min: 1, max: 280 })
    .withMessage(`Comment ${textLength}`),
];

module.exports = validateComment;
