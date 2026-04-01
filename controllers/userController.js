const service = require("../services/userService");

const postUser = async (req, res) => {
  const { username, password } = req.body;

  await service.postUser(username, password);

  return res.json({ username, password });
};

const getUser = async (req, res) => {
  const user = await service.getUser(req.body.username);

  return res.json({ user });
};

module.exports = {
  postUser,
  getUser,
};
