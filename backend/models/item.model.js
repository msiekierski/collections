const mongoose = require("mongoose");
const Comment = require("./comment.model");
const Schema = mongoose.Schema;

const itemSchema = new Schema(
  {
    name: String,
    tags: [],
    customFieldsValues: {},
    collectionId: { type: Schema.Types.ObjectId, ref: "Collection" },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);

itemSchema.index({ name: "text", tags: "text" });

itemSchema.pre("deleteMany", async function (next) {
  try {
    let deletedData = await Item.find(this._conditions).lean();

    await Promise.all(
      deletedData.map((data) => Comment.deleteMany({ itemId: data["_id"] }))
    );
    return next(); // normal save
  } catch (error) {
    return next(error);
  }
});

let Item = mongoose.model("Item", itemSchema);

module.exports = Item;
