const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const Item = require("./item.model");
const CustomField = require("./customField.model");

const collectionSchema = new Schema({
  name: String,
  description: String,
  imageUrl: String,
  authorId: { type: Schema.Types.ObjectId, ref: "User" },
  topic: { type: Schema.Types.String, ref: "CollectionTopic" },
  customFields: [{ type: Schema.Types.ObjectId, ref: "CustomField" }],
  items: [{ type: Schema.Types.ObjectId, ref: "Item" }],
});

collectionSchema.pre("deleteMany", async function (next) {
  try {
    let deletedData = await Collection.find(this._conditions).lean();
    await Promise.all([
      ...deletedData.map((collection) =>
        CustomField.deleteMany({ _id: { $in: collection.customFields } })
      ),
      ...deletedData.map((collection) =>
        Item.deleteMany({ collectionId: collection["_id"] })
      ),
    ]);
    return next(); // normal save
  } catch (error) {
    return next(error);
  }
});

let Collection = mongoose.model("Collection", collectionSchema);

module.exports = Collection;
