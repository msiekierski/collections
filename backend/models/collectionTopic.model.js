const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const collectionTopicSchema = new Schema({
  _id: String,
});

const CollectionTopic = mongoose.model(
  "CollectionTopic",
  collectionTopicSchema
);

module.exports = CollectionTopic;
