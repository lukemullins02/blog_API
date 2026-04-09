const { body } = require("express-validator");

const titleLength = "must be between 5 and 120 characters.";
const blogLength = "must be between 50 and 10000 characters.";

const validatePost = [
  body("title")
    .isLength({ min: 5, max: 120 })
    .withMessage(`Title ${titleLength}`),
  body("blog")
    .isLength({ min: 50, max: 10000 })
    .withMessage(`Blog ${blogLength}`),
];

module.exports = validatePost;
