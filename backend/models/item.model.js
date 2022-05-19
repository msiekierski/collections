const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: String,
  tags: [],
  customFieldsValues: {},
  collectionId: { type: Schema.Types.ObjectId, ref: "Collection" },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
