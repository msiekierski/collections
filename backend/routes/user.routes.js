var express = require("express");
var router = express.Router();
const User = require("../models/user.model");

router.route("/").post(async (req, res) => {
  const { email, password } = req.body;
  const newUser = new User({
    email,
    password,
    isAdmin: false,
    collections: [],
  });

  const usersWithEmail = await User.find({ email });
  if (usersWithEmail.length > 0) {
    res.status(409).send(`User with email ${email} already exists`);
    return;
  }

  try {
    await newUser.save();
    res.json("User added!");
  } catch (e) {
    res.status(400).json("Error: " + e);
  }
});

router.route("/logIn").post(async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password }, { password: 0 });
    if (!!user) {
      res.json(user);
    } else {
      res.status(404).send("Invalid credentials");
    }
  } catch (e) {
    res.status(400).json("Error: " + e);
  }
});

router.route("/email/:email").get(async (req, res) => {
  const { email } = req.params;
  const user = await User.findOne({ email: email });
  res.status(200).json(user);
});

module.exports = router;
