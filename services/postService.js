const { prisma } = require("../lib/prisma.js");

async function postBlog(userID, title, blog) {
  await prisma.post.create({
    data: {
      userID,
      title,
      blog,
    },
  });
}

async function getPost(id) {
  return await prisma.post.findUnique({
    where: { id: Number(id) },
  });
}

async function getPosts(userID) {
  return await prisma.post.findMany({
    where: { userID },
  });
}

async function putPost(id, title, blog) {
  await prisma.post.update({
    where: { id: Number(id) },
    data: { title, blog },
  });
}

async function deletePost(id) {
  await prisma.post.delete({
    where: { id: Number(id) },
  });
}

module.exports = {
  postBlog,
  getPost,
  getPosts,
  putPost,
  deletePost,
};
