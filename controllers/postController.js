const service = require("../services/postService");

const postBlog = async (req, res) => {
  const { id } = req.user.user;
  const { title, blog } = req.body;

  await service.postBlog(id, title, blog);

  return res.json({ id, title, blog });
};

const getPost = async (req, res) => {
  const { postid } = req.params;

  const post = await service.getPost(postid);

  return res.json(post);
};

const getPosts = async (req, res) => {
  const { id } = req.user.user;

  const posts = await service.getPosts(id);

  return res.json(posts);
};

const putPost = async (req, res) => {
  const { postid } = req.params;
  const { title, blog } = req.body;

  await service.putPost(postid, title, blog);

  return res.json({ postid, title, blog });
};

const deletePost = async (req, res) => {
  const { postid } = req.params;

  console.log(deletePost);

  await service.deletePost(postid);

  return res.json({ message: "DELETED" });
};

module.exports = {
  postBlog,
  getPost,
  getPosts,
  putPost,
  deletePost,
};
