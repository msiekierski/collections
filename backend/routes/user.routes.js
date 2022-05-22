var express = require("express");
var router = express.Router();
const User = require("../models/user.model");

router.route("/").post(async (req, res) => {
  const { email, password } = req.body;
  const newUser = new User({
    email,
    password,
    isAdmin: false,
    isBlocked: false,
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
      if (user.isBlocked) {
        res.status(403).send("Account blocked");
        return;
      }
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

router.route("/id/:userId").put(async (req, res) => {
  const { isAdmin, isBlocked } = req.body;
  const { userId } = req.params;

  let user = await User.findById(userId);

  if (!!user) {
    if (isAdmin !== undefined) {
      user.isAdmin = isAdmin;
    }
    if (isBlocked !== undefined) {
      user.isBlocked = isBlocked;
    }
  } else {
    res.status(404).send("User does not exist");
  }
  user = await user.save();
  res.status(200).json(user);
});

router.route("/id/:userId").delete(async (req, res) => {
  const { userId } = req.params;
  const deleted = await User.deleteOne({ _id: userId });
  if (!!deleted) {
    res.status(200).send(`User ${userId} deleted`);
  } else {
    res.status(404).send("User does not exist");
  }
});

router.route("/").get(async (req, res) => {
  const allUsers = await User.find({});
  res.status(200).json(allUsers);
});

module.exports = router;
