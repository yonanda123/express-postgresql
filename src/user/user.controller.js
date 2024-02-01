const express = require("express");
const { newUser, login } = require("./user.service");
const dotenv = require("dotenv");

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const newUsers = req.body;
    const users = await newUser(newUsers);

    res.send({
      data: users,
      message: "User created successfully",
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const users = req.body;
    const user = await login(users, JWT_SECRET);
    console.log(user);
    res.send({
      user,
      message: "User created successfully",
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

module.exports = router;
