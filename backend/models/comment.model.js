const mongoose = require("mongoose");
const CommentLike = require("./commentLike.model");
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

commentSchema.pre("deleteMany", async function (next) {
  try {
    let deletedData = await Comment.find(this._conditions).lean();

    await Promise.allSettled(
      deletedData.map((data) =>
        CommentLike.deleteMany({ commentId: data["_id"] })
      )
    );
    return next(); // normal save
  } catch (error) {
    return next(error);
  }
});

let Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
