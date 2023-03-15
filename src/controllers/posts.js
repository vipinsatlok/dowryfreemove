const cloudinary = require("cloudinary").v2;
const fs = require("@cyclic.sh/s3fs");
const path = require("path");
const { envData } = require("../../config");
const model = require("../models/posts");
const userModel = require("../models/users");
const axios = require("axios");

// Configuration
cloudinary.config({
  cloud_name: envData.cloudnaryName,
  api_key: envData.cloudnaryKey,
  api_secret: envData.cloudnarySecret,
});

const addPost = async (req, res) => {
  try {
    // getting data from user
    let { she, he, district, tehsil, state, date, image, verified } = req.body;

    if (req.user.role === "user") verified = false;

    const imageName = Date.now();

    const url =
      "https://script.google.com/macros/s/AKfycbxFqnbrwYmBoH0WXWPbdI9ONUphARIcIMYoNUNiXV2PZBE9fEFmeWulFP7ErRsjKRX6/exec";

    const data = new URLSearchParams();
    data.append("name", imageName);
    data.append("file", image);

    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };
    const response = await axios.post(url, data, config);

    if (!response.data.success) res.status(500).json({ success: false });

    await model.create({
      he,
      she,
      district,
      state,
      tehsil,
      date,
      userId: req.user._id,
      verified,
      image: response.data.url,
      publicId: response.data.id,
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("error from adding post", err.message);
  }
};

const updatePost = async (req, res) => {
  try {
    // getting data from user
    let { she, he, district, tehsil, state, date, verified } = req.body;

    // find post
    const post = await model.findById(req.params.id);
    if (!post) return res.status(404).json({ success: false });

    // save to database
    await model.findByIdAndUpdate(
      req.params.id,
      {
        he,
        she,
        district,
        state,
        tehsil,
        verified,
        date,
        userId: req.user._id,
      },
      { new: true }
    );

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("error from update post", err.message);
    res.status(500).json({ success: false });
  }
};

const deletePost = async (req, res) => {
  try {
    // find post
    const post = await model.findById(req.params.id);
    if (!post) return res.status(404).json({ success: false });

    // delete from mongodb
    await post.deleteOne();

    // delete image from cloudnary
    await cloudinary.uploader.destroy(post.publicId);

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("err from delete post", err.message);
    res.status(500).json({ success: false });
  }
};

const likePost = async (req, res) => {
  try {
    // find post by id
    const post = await model.findById(req.params.id);
    if (!post) return res.status(404).json({ success: false });

    let likes = [];
    // if already liked
    const isLiked = post.likes.find((item) => {
      if (!item) return {};
      const userId = String(req.user._id).split("(")[0];
      const userLikeId = String(item._id).split("(")[0];
      return userId === userLikeId;
    });

    if (isLiked) {
      likes = post.likes.filter((item) => {
        const userId = String(req.user._id).split("(")[0];
        const userLikeId = String(item._id).split("(")[0];
        return userId !== userLikeId;
      });
      post.likes = likes;
      await post.save();
      res.status(200).json({ success: true, like: -1 });
    } else {
      post.likes.push(req.user._id);
      await post.save();
      res.status(200).json({ success: true, like: 1 });
    }
  } catch (error) {
    console.error("error from like post", error);
    res.status(500).json({ success: false });
  }
};

const deleteUser = async (req, res) => {
  try {
    // find post
    await userModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error("err from delete post", err.message);
    res.status(500).json({ success: false });
  }
};

module.exports = {
  addPost,
  updatePost,
  deleteUser,
  likePost,
  deletePost,
};
