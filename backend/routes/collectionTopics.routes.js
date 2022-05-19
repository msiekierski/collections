var express = require("express");
var router = express.Router();
const CollectionTopic = require("../models/collectionTopic.model");

router.route("/").get(async (req, res) => {
  try {
    const topics = await CollectionTopic.find({});
    res.status(200).json(topics);
  } catch (e) {
    res.status(400).send("Error: " + e);
  }
});


module.exports = router;
