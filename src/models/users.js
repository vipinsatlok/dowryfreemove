const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    role: {
      type: String,
      default: "user",
    },
    avatar: {
      type: String,
    },
    email: {
      unique: true,
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("userData", userSchema);
