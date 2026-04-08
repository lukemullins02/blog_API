const service = require("../services/postService");
const validatePost = require("../validation/validatePost");
const { validationResult, matchedData } = require("express-validator");

const postBlog = [
  validatePost,
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array()[0].msg });
      }

      const { id } = req.user.user;
      const { title, blog } = matchedData(req);

      await service.postBlog(id, title, blog);

      return res.status(201).json({ id, title, blog });
    } catch {
      return res.status(500).json({ message: "Failed to create blog post" });
    }
  },
];

const getPost = async (req, res) => {
  try {
    const { postid } = req.params;

    const post = await service.getPost(postid);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    return res.status(200).json(post);
  } catch {
    return res.status(500).json({ message: "Server Error" });
  }
};

const getPosts = async (req, res) => {
  try {
    const { id } = req.user.user;

    const posts = await service.getPosts(id);

    return res.status(200).json(posts);
  } catch {
    return res.status(500).json({ message: "Server Error" });
  }
};

const putPost = [
  validatePost,
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array()[0].msg });
      }

      const { postid } = req.params;
      const { title, blog } = matchedData(req);

      await service.putPost(postid, title, blog);

      return res.status(200).json({ postid, title, blog });
    } catch {
      return res.status(500).json({ message: "Failed to update post" });
    }
  },
];

const putPublish = async (req, res) => {
  try {
    const { postid } = req.params;
    const { published } = req.body;

    if (published === undefined) {
      return res.status(400).json({ message: "Publish status not recieved" });
    }

    await service.putPublish(postid, published);

    return res.status(200).json({ postid, published });
  } catch {
    return res.status(500).json({ message: "Failed to update publish status" });
  }
};

const deletePost = async (req, res) => {
  try {
    const { postid } = req.params;

    await service.deletePost(postid);

    return res.status(204).send();
  } catch {
    return res.status(404).json({ error: "Post doesn't exist" });
  }
};

module.exports = {
  postBlog,
  getPost,
  getPosts,
  putPost,
  putPublish,
  deletePost,
};
