const { prisma } = require("../lib/prisma.js");

async function postComment(userID, postID, text) {
  await prisma.comment.create({
    data: {
      userID,
      postID: Number(postID),
      text,
    },
  });
}

async function getComments(postID) {
  return await prisma.comment.findMany({
    orderBy: {
      id: "desc",
    },
    where: { postID: Number(postID) },
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  });
}

async function getComment(id) {
  return await prisma.comment.findUnique({
    where: { id: Number(id) },
  });
}

async function putComment(id, text) {
  await prisma.comment.update({
    where: { id: Number(id) },
    data: { text },
  });
}

async function deleteComment(id) {
  await prisma.comment.delete({
    where: { id: Number(id) },
  });
}

module.exports = {
  postComment,
  getComments,
  getComment,
  putComment,
  deleteComment,
};
