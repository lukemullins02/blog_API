const service = require("../services/commentService");

const postComment = async (req, res) => {
  try {
    const { id } = req.user.user;
    const { postid } = req.params;
    const { text } = req.body;

    await service.postComment(id, postid, text);

    return res.json({ id, postid, text });
  } catch {
    return res.json({ error: "Failed to Create Comment" });
  }
};

const getComment = async (req, res) => {
  try {
    const { commentid } = req.params;

    const comment = await service.getComment(commentid);

    if (!comment) {
      return res.json({ error: "Comment Doesn't Exist" });
    }

    return res.json(comment);
  } catch {
    return res.json({ error: "Server Error" });
  }
};

const getComments = async (req, res) => {
  try {
    const { postid } = req.params;

    const comments = await service.getComments(postid);

    return res.json(comments);
  } catch {
    return res.json({ error: "No Comments for Post" });
  }
};

const putComment = async (req, res) => {
  try {
    const { commentid } = req.params;
    const { text } = req.body;

    if (!text) {
      return res.json({ error: "Failed to update comment" });
    }

    await service.putComment(commentid, text);

    return res.json({ commentid, text });
  } catch {
    return res.json({ error: "Comment doesn't exist" });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { commentid } = req.params;

    await service.deleteComment(commentid);

    return res.json({ message: "DELETED" });
  } catch {
    return res.json({ error: "Comment doesn't exist" });
  }
};

module.exports = {
  postComment,
  getComments,
  getComment,
  putComment,
  deleteComment,
};
