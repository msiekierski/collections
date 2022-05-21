const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const CollectionTopic = require("./models/collectionTopic.model");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true });
const connection = mongoose.connection;

const constCollectionTopics = [
  "BOOKS",
  "SIGNS",
  "SILVERWARE",
  "BEVERAGES",
  "MOVIES",
];

connection.once("open", async () => {
  await CollectionTopic.deleteMany({});
  CollectionTopic.insertMany(
    constCollectionTopics.map((topic) => new CollectionTopic({ _id: topic }))
  );
});

const userRouter = require("./routes/user.routes");
const collectionTopics = require("./routes/collectionTopics.routes");
const collectionRouter = require("./routes/collection.routes");
const itemRouter = require("./routes/item.routes");
const commentRouter = require("./routes/comment.routes");
const commnetLikeRouter = require("./routes/commentLike.routes");

app.use("/user", userRouter);
app.use("/collectionTopics", collectionTopics);
app.use("/collection", collectionRouter);
app.use("/item", itemRouter);
app.use("/comment", commentRouter);
app.use("/commentLike", commnetLikeRouter);

app.listen(port, () => {});
