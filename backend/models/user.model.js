const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;
const Collection = require("./collection.model");
const SALT_WORK_FACTOR = 10;

const userSchema = new Schema(
  {
    email: { type: String, unique: true },
    password: { type: String, required: true },
    isAdmin: Boolean,
    isBlocked: Boolean,
  },
  { timestamps: true }
);

userSchema.pre("save", async function save(next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

userSchema.methods.validatePassword = async function validatePassword(data) {
  return bcrypt.compare(data, this.password);
};

userSchema.pre("deleteOne", async function (next) {
  try {
    let deletedData = await User.find(this._conditions).lean();
    if (deletedData.length > 0) {
      await Collection.deleteMany({ authorId: deletedData[0]["_id"] });
    }
    return next(); // normal save
  } catch (error) {
    return next(error);
  }
});

let User = mongoose.model("User", userSchema);

module.exports = User;
