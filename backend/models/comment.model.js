const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    text: String,
    itemId: { type: Schema.Types.ObjectId, ref: "Item" },
    author: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

commentSchema.index({ text: "text" });

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
