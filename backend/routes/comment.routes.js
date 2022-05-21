var express = require("express");
var router = express.Router();
const Comment = require("../models/comment.model");
const Item = require("../models/item.model");
const CommentLike = require("../models/commentLike.model");

router.route("/item/:itemId").post(async (req, res) => {
  const { itemId } = req.params;
  const { text, userId } = req.body;

  let newComment = new Comment({
    text,
    itemId,
    author: userId,
  });
  newComment = await newComment.save();
  res.status(200).json(newComment);
});

router.route("/item/:itemId").get(async (req, res) => {
  const { itemId } = req.params;
  const comments = await Comment.find({ itemId }).populate("author").lean();
  const likes = await Promise.allSettled(
    comments.map((comment) => {
      return CommentLike.find({ commentId: comment["_id"] });
    })
  );
  const result = comments.map((comment, index) => {
    comment.likes = likes[index].value;
    return comment;
  });
  res.status(200).json(result);
});

module.exports = router;
