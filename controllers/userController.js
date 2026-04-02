const service = require("../services/userService");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

const postUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    await service.postUser(username, password);

    return res.status(201).json({ username, password });
  } catch {
    return res.status(500).json({ message: "Failed to create user" });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await service.getUser(req.user.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
  } catch {
    return res.status(500).json({ message: "Server Error" });
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

    if (!password) {
      return res.status(401).json({
        message: "Invalid Password. Try again.",
      });
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
  getUser,
  login,
};
