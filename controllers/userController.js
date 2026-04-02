const service = require("../services/userService");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const secret = process.env.SECRET;

const postUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

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
};

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
