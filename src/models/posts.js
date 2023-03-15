const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    he: {
      type: String,
    },
    she: {
      type: String,
    },
    date: {
      type: Date,
      default: new Date(),
    },
    state: {
      type: String,
    },
    district: {
      type: String,
    },
    tehsil: {
      type: String,
    },
    image: {
      type: String,
      required: true,
    },
    publicId: String,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userData",
    },
    verified: {
      type: Boolean,
      default: false,
    },
    likes: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "userData",
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("posts", postSchema);
