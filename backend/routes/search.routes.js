var express = require("express");
var router = express.Router();
const Item = require("../models/item.model");
const Comment = require("../models/comment.model");

function removeDuplicates(originalArray, prop) {
  var newArray = [];
  var lookupObject = {};

  for (var i in originalArray) {
    lookupObject[originalArray[i][prop]] = originalArray[i];
  }

  for (i in lookupObject) {
    newArray.push(lookupObject[i]);
  }
  return newArray;
}

router.route("/:searchText").get(async (req, res) => {
  const { searchText } = req.params;
  const items = await Item.find({ $text: { $search: searchText } });
  const comments = await Comment.find({
    $text: { $search: searchText },
  })
    .populate("itemId")
    .populate("collectionId");

  const itemsFromComments = comments.map((comment) => comment.itemId);

  const concatItems = [...items, ...itemsFromComments];

  const filtered = removeDuplicates(concatItems, "_id");

  res.status(200).json(filtered);
});

module.exports = router;
