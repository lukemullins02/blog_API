const service = require("../services/userService");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const secret = process.env.SECRET;
const validateUser = require("../validation/validateUser");
const { validationResult, matchedData } = require("express-validator");

const postUser = [
  validateUser,
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array()[0].msg });
      }

      const { username, password } = matchedData(req);

      const userExists = await service.getUser(username);

      if (userExists) {
        return res
          .status(400)
          .json({ message: "Username already registered. Try again." });
      }

      const hashPassword = await bcrypt.hash(password, 10);

      await service.postUser(username, hashPassword);

      return res.status(201).json({ username, password });
    } catch {
      return res.status(500).json({ message: "Failed to create user" });
    }
  },
];

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await service.getUser(username);

    if (!user) {
      return res.status(401).json({
        message: "Invalid Username. Try again.",
      });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res
        .status(400)
        .json({ message: "Incorrect Password. Try again." });
    }

    const token = jwt.sign({ user }, secret, { expiresIn: "1h" });

    res.json({ token });
  } catch (error) {
    res.status(500).json({
      message: "Login Failed",
    });
  }
};

module.exports = {
  postUser,
  login,
};
