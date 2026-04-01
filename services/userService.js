const { prisma } = require("../lib/prisma.js");

async function postUser(username, password) {
  await prisma.user.create({
    data: {
      username,
      password,
    },
  });
}

async function getUser(username) {
  return await prisma.user.findUnique({
    where: { username },
  });
}

module.exports = {
  postUser,
  getUser,
};
