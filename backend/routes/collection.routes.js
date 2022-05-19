var express = require("express");
var router = express.Router();
const Collection = require("../models/collection.model");
const CollectionTopic = require("../models/collectionTopic.model");
const User = require("../models/user.model");
const CustomField = require("../models/customField.model");

router.route("/user/:userId").post(async (req, res) => {
  const { userId } = req.params;
  const { name, topic, description, customFields } = req.body;

  let newCollection = new Collection({
    name,
    topic: topic["_id"],
    description,
    authorId: userId,
  });
  newCollection = await Collection.create(newCollection);

  const newCustomFields = await Promise.allSettled(
    customFields.map((customField) => {
      const { name, type } = customField;
      let newCustomField = new CustomField({
        name,
        type,
      });
      return CustomField.create(newCustomField);
    })
  );
  newCustomFields.forEach(({ value }) =>
    newCollection.customFields.push(value["_id"])
  );
  await newCollection.save();
  //   newCollection.customFields = customFieldIds;
  //   await newCollection.save();
  return res.status(200).json(newCollection);
});

router.route("/user/:userId").get(async (req, res) => {
  const { userId } = req.params;
  const collections = await Collection.find({ authorId: userId });
  res.status(200).json(collections);
});

router.route("/:collectionId").delete(async (req, res) => {
  const { collectionId } = req.params;
  const toRemove = await Collection.findById(collectionId);
  await CustomField.deleteMany({ _id: { $in: toRemove.customFields } });
  await Collection.deleteOne({ _id: collectionId });
  res.status(200).send("deleted");
});

router.route("/:collectionId").get(async (req, res) => {
  const { collectionId } = req.params;
  const collection = await Collection.findById(collectionId)
    .populate("customFields")
    .populate("items");
  res.status(200).json(collection);
});

module.exports = router;
