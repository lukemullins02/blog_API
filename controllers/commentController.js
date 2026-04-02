const service = require("../services/commentService");

const postComment = async (req, res) => {
  try {
    const { id } = req.user.user;
    const { postid } = req.params;
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Text is required" });
    }

    await service.postComment(id, postid, text);

    return res.status(201).json({ id, postid, text });
  } catch {
    return res.status(500).json({ message: "Failed to create comment" });
  }
};

const getComment = async (req, res) => {
  try {
    const { commentid } = req.params;

    const comment = await service.getComment(commentid);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    return res.status(200).json(comment);
  } catch {
    return res.status(500).json({ message: "Server Error" });
  }
};

const getComments = async (req, res) => {
  try {
    const { postid } = req.params;

    const comments = await service.getComments(postid);

    return res.status(200).json(comments);
  } catch {
    return res.status(500).json({ message: "Server Error" });
  }
};

const putComment = async (req, res) => {
  try {
    const { commentid } = req.params;
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Text is required" });
    }

    await service.putComment(commentid, text);

    return res.status(200).json({ commentid, text });
  } catch {
    return res.status(500).json({ message: "Failed to update comment" });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { commentid } = req.params;

    await service.deleteComment(commentid);

    return res.status(204).send();
  } catch {
    return res.status(404).json({ error: "Comment doesn't exist" });
  }
};

module.exports = {
  postComment,
  getComments,
  getComment,
  putComment,
  deleteComment,
};
