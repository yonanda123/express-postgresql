const prisma = require("../db");
const {hashSync} = require('bcrypt')

const findUserByEmail = async (userData) => {
  const user = await prisma.user.findFirst({
    where: {
      email : userData.email,
    },
  });

  return user;
};

const createUser = async (userData) => {
    const user = await prisma.user.create({
        data: {
            username : userData.username,
            email : userData.email,
            password : hashSync(userData.password, 10),
        }
    });
    return user;
}

module.exports = {
  findUserByEmail,
  createUser
};
