const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentLikeSchema = new Schema({
  value: Number,
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  commentId: { type: Schema.Types.ObjectId, ref: "Comment" },
});

const CommentLike = mongoose.model("CommentLike", commentLikeSchema);

module.exports = CommentLike;
