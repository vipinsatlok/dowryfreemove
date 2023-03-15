const model = require("../models/posts");
const userModel = require("../models/users");
const { inputData } = require("../data");

function createHeader(headTitle, headDec, headImage, headUrl) {
  return {
    headTitle,
    headDec,
    headImage,
    headUrl,
  };
}

function isLiked(req, data) {
  const liked = data.find((item) => {
    if (!item) return null;
    const userId = String(req.user._id).split("(")[0];
    const userLikeId = String(item._id).split("(")[0];
    return userId === userLikeId;
  });

  if (!liked) return false;
  return true;
}

async function getDataToDataBase(req, res, model, query, populate = "") {
  try {
    const page = parseInt(req.query.page) || 1;

    // Get total number of posts that match filter
    const totalData = await model.countDocuments(query);

    // Get total number of pages based on limit
    const totalPages = Math.ceil(totalData / 10);

    // Calculate skip value based on page and limit
    const skip = (page - 1) * 10;

    // Get posts based on filter, skip, and limit
    const data = await model
      .find(query)
      .skip(skip)
      .limit(10)
      .populate(populate)
      .sort({ timestamp: -1 });

    // Return response with posts, pagination info, and success status
    return {
      success: true,
      data,
      totalData: totalData,
      totalPages: totalPages,
      currentPage: page,
      user: req.user,
    };
  } catch (err) {
    console.error(err);
    res.redirect("/");
  }
}

const addPost = async (req, res) => {
  const sendData = {
    inputData: inputData(),
    ...createHeader(
      "Dowry Free Move : Add",
      "Dowry free move community.",
      "/images/google.jpg",
      "/add"
    ),
    user: req.user,
  };

  res.render("pages/addPost", sendData);
};

const post = async (req, res) => {
  try {
    const getPost = await model.findById(req.params.id).populate("userId");
    if (!getPost) {
      return res.status(404).res.redirect("/");
    }

    const data = {
      user: req.user,
      item: getPost,
    };

    res.render(`pages/post`, data);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const updatePost = async (req, res) => {
  try {
    const getPost = await model.findById(req.params.id);
    if (!getPost) {
      return res.status(404).res.redirect("/");
    }

    const values = {
      she: getPost.she,
      he: getPost.he,
      district: getPost.district,
      state: getPost.state,
      verified: getPost.verified,
      image: getPost.image,
    };

    const sendData = {
      inputData: inputData(values),
      ...createHeader(
        "Dowry Free Move : Update",
        "Dowry free move community.",
        "/images/google.jpg",
        `/update/${req.params.id}`
      ),
      user: req.user,
    };

    res.render(`pages/updatePost`, sendData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const profile = async (req, res) => {
  try {
    // console.log("hello", req.params.id)
    const paramsUser = await userModel.findById(req.params.id);
    if (!paramsUser) return res.redirect("/");

    const data = await getDataToDataBase(
      req,
      res,
      model,
      { userId: req.params.id },
      "userId"
    );

    // Return response with posts, pagination info, and success status
    const sendData = {
      paramsUser,
      ...data,
      ...createHeader(
        `Dowry Free Move : ${paramsUser.name}`,
        `${paramsUser.name} is Dowry free move community user.`,
        `${paramsUser.avatar}`,
        `/user/${paramsUser._id}`
      ),
    };

    res.render("pages/profile", sendData);
  } catch (err) {
    console.log("profile");
    console.log(err);
    res.redirect("/");
  }
};

const home = async (req, res) => {
  try {
    // Get total number of posts that match filter
    const data = await getDataToDataBase(
      req,
      res,
      model,
      { verified: true },
      "userId"
    );

    // Return response with posts, pagination info, and success status
    const sendData = {
      ...data,
      ...createHeader(
        "Dowry Free Move",
        "Dowry free move community.",
        "/images/google.jpg",
        "/"
      ),
    };

    res.render("pages/index", sendData);
  } catch (err) {
    console.log("home");
    console.error(err);
    res.status(500).json({ success: false }).r;
  }
};

const pendingPost = async (req, res) => {
  try {
    const data = await getDataToDataBase(
      req,
      res,
      model,
      { verified: false },
      "userId"
    );

    // Return response with posts, pagination info, and success status
    const sendData = {
      ...data,
      ...createHeader(
        "Dowry Free Move : Pending Posts",
        "Dowry free move community.",
        "/images/google.jpg",
        "/pending"
      ),
    };

    res.render("pages/pendingPost", sendData);
  } catch (err) {
    console.log("pending post");
    console.error(err);
    res.status(500).redirect("/");
  }
};

const users = async (req, res) => {
  try {
    const data = await getDataToDataBase(req, res, userModel, {});

    const sendData = {
      ...data,
      user: req.user,
      ...createHeader(
        `Dowry Free Move : Users`,
        `Dowry free move community.`,
        `/images/google.jpg`,
        `/users`
      ),
    };

    res.render("pages/users", sendData);
  } catch (err) {
    console.log("users page");
    console.error(err);
    res.status(500).redirect("/");
  }
};

const about = (req, res) => {
  const sendData = {
    ...createHeader(
      `Dowry Free Move : About us`,
      `Dowry free move community.`,
      `/images/google.jpg`,
      `/about`
    ),
    user: req.user,
  };
  res.render("pages/about", sendData);
};

const contact = (req, res) => {
  const sendData = {
    ...createHeader(
      `Dowry Free Move : Contact us`,
      `Dowry free move community.`,
      `/images/google.jpg`,
      `/contact`
    ),
    user: req.user,
  };
  res.render("pages/contact", sendData);
};

module.exports = {
  home,
  addPost,
  post,
  updatePost,
  pendingPost,
  users,
  profile,
  about,
  contact,
};
