const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const customFieldSchema = new Schema({
  name: String,
  type: String,
});

const CustomField = mongoose.model("CustomField", customFieldSchema);

module.exports = CustomField;
