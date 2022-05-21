var express = require("express");
var router = express.Router();
const CommentLike = require("../models/commentLike.model");

router.route("/user/:userId/comment/:commentId").post(async (req, res) => {
  const { userId, commentId } = req.params;
  const { value } = req.body;

  await CommentLike.deleteMany({ userId, commentId });
  let newLike = new CommentLike({ value, userId, commentId });
  newLike = await newLike.save();
  res.status(200).json(newLike);
});

router.route("/user/:userId/comment/:commentId").delete(async (req, res) => {
  const { userId, commentId } = req.params;
  await CommentLike.deleteOne({ userId, commentId });
});

module.exports = router;
