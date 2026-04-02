const service = require("../services/userService");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

const postUser = async (req, res) => {
  const { username, password } = req.body;

  await service.postUser(username, password);

  return res.json({ username, password });
};

const getUser = async (req, res) => {
  const user = await service.getUser(req.body.username);

  return res.json({ user });
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

    jwt.sign({ user }, secret, { expiresIn: "1hr" }, (err, token) => {
      res.json({
        token,
      });
    });
  } catch (error) {
    res.status(500).json({
      message: "Login Failed",
    });
    console.error(error);
  }
};

module.exports = {
  postUser,
  getUser,
  login,
};
