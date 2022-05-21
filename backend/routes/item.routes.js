var express = require("express");
var router = express.Router();
const Item = require("../models/item.model");
const Collection = require("../models/collection.model");
const { json } = require("body-parser");

router.route("/tags").get(async (req, res) => {
  const allItems = await Item.find({});
  const tags = allItems.map((item) => item.tags);

  const mergedTags = [].concat.apply([], tags);
  const uniqueTags = [...new Set(mergedTags)];

  res.status(200).json(uniqueTags);
});

router.route("/").post(async (req, res) => {
  const { name, tags, collectionId, customFields } = req.body;
  let newItem = new Item({
    name,
    tags,
    collectionId,
    customFieldsValues: customFields,
  });
  newItem = await newItem.save();
  let itemCollection = await Collection.findById(collectionId);
  itemCollection.items.push(newItem["_id"]);
  await itemCollection.save();
  res.status(200).json(newItem);
});

router.route("/").delete(async (req, res) => {
  const { ids } = req.body;
  await Item.deleteMany({ _id: { $in: ids } });
  if (ids && ids.length) {
    let collectionWithItem = await Collection.findOne({ items: ids[0] });
    collectionWithItem.items = collectionWithItem.items.filter(
      (id) => !ids.includes(id.toString())
    );
    await collectionWithItem.save();
  }
  res.status(200).send("ok");
});

router.route("/latest/:topLatest").get(async (req, res) => {
  const { topLatest } = req.params;
  const result = await Item.find({})
    .sort({ createdAt: -1 })
    .limit(topLatest)
    .populate("collectionId")
    .populate({
      path: "collectionId",
      populate: { path: "authorId", collection: "User" },
    });
  res.status(200).json(result);
});

router.route("/:itemId").get(async (req, res) => {
  const { itemId } = req.params;
  const item = await Item.findById(itemId).populate("collectionId");
  res.status(200).json(item);
});

module.exports = router;
