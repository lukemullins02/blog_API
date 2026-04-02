const service = require("../services/commentService");

const postComment = async (req, res) => {
  const { postid } = req.params;
  const { userID, text } = req.body;

  await service.postComment(userID, postid, text);

  return res.json({ userID, postid, text });
};

const getComment = async (req, res) => {
  const { commentid } = req.params;

  const comment = await service.getComment(commentid);

  return res.json(comment);
};

const getComments = async (req, res) => {
  const { postid } = req.params;

  const comments = await service.getComments(postid);

  return res.json(comments);
};

const putComment = async (req, res) => {
  const { commentid } = req.params;
  const { text } = req.body;

  await service.putComment(commentid, text);

  return res.json({ commentid, text });
};

const deleteComment = async (req, res) => {
  const { commentid } = req.params;

  await service.deleteComment(commentid);

  return res.json({ message: "DELETED" });
};

module.exports = {
  postComment,
  getComments,
  getComment,
  putComment,
  deleteComment,
};
