const { compareSync } = require("bcrypt");
const { createUser, findUserByEmail } = require("./user.repository");
const jwt = require("jsonwebtoken");

const newUser = async (userData) => {
  const user = await findUserByEmail(userData);
  if (user) {
    throw new Error("User already exists");
  }
  user = await createUser(userData);
  return user;
};

const login = async (userData, secretToken) => {
  const data = await findUserByEmail(userData);
  if (!data) {
    throw new Error("User already exists!");
  }
  if (!compareSync(userData.password, data.password)) {
    throw new Error("Incorrect password");
  }
  const token = jwt.sign({ id: data.id }, secretToken);
  return {data, token};
};

module.exports = {
  newUser,
  login,
};
