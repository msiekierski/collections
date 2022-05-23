var express = require("express");
var router = express.Router();
var axios = require("axios");
var uuid = require("uuid");
require("dotenv").config();
const Collection = require("../models/collection.model");
const CollectionTopic = require("../models/collectionTopic.model");
const User = require("../models/user.model");
const CustomField = require("../models/customField.model");
const Item = require("../models/item.model");
var ImageKit = require("imagekit");

var imagekit = new ImageKit({
  publicKey: "public_c9qJcaJo2a5c/EnoGuBChw04deo=",
  privateKey: `${process.env.IMAGE_API_PRIVATE_KEY}`,
  urlEndpoint: "https://ik.imagekit.io/ia0isbt2n/",
});

router.route("/user/:userId").post(async (req, res) => {
  const { userId } = req.params;
  const { name, topic, description, customFields, imageBase64 } = req.body;
  let imageUrl = "";
  if (imageBase64 !== null) {
    const result = await imagekit.upload({
      file: imageBase64, //required
      fileName: uuid.v4(), //required
    });
    imageUrl = result.url;
  }

  let newCollection = new Collection({
    name,
    topic: topic["_id"],
    description,
    authorId: userId,
    imageUrl,
  });
  newCollection = await Collection.create(newCollection);
  console.log(newCollection);
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
  await Item.deleteMany({ collectionId });
  res.status(200).send("deleted");
});

router.route("/:collectionId").get(async (req, res) => {
  const { collectionId } = req.params;
  const collection = await Collection.findById(collectionId)
    .populate("customFields")
    .populate("items")
    .populate("authorId");
  res.status(200).json(collection);
});

router.route("/largest/:topLargest").get(async (req, res) => {
  const { topLargest } = req.params;
  let result = await Collection.aggregate([
    { $unwind: "$items" },
    { $group: { _id: "$_id", ct: { $sum: 1 } } },
    { $sort: { ct: -1 } },
  ]);

  result = result.slice(0, topLargest);
  const matching = await Promise.allSettled(
    result.map(async (collection) => Collection.findById(collection["_id"]))
  );
  result.forEach((entry, index) => (entry.info = matching[index].value));
  res.status(200).json(result);
});

module.exports = router;
