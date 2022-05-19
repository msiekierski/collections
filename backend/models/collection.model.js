const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const collectionSchema = new Schema({
  name: String,
  description: String,
  imageUrl: String,
  authorId: { type: Schema.Types.ObjectId, ref: "User" },
  topic: { type: Schema.Types.String, ref: "CollectionTopic" },
  customFields: [{ type: Schema.Types.ObjectId, ref: "CustomField" }],
  items: [{ type: Schema.Types.ObjectId, ref: "Item" }],
});

const Collection = mongoose.model("Collection", collectionSchema);

module.exports = Collection;
