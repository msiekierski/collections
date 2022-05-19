const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  date: Date,
  text: String,
  author: { type: Schema.Types.ObjectId, ref: "User" },
  likes: [{ type: Schema.Types.ObjectId, ref: "CommentLike" }],
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
