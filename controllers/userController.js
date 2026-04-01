const postUser = async (req, res) => {
  return res.send(req.body.password);
};

module.exports = {
  postUser,
};
