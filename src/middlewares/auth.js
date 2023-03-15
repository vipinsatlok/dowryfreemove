const model = require("../models/users");
const jwt = require("jsonwebtoken");
const { envData } = require("../../config");

const isAuth = async (req, res, next) => {
  try {
    // get cookie
    const token = req.cookies.auth;
    if (!token) return res.redirect("/auth/google");

    // payload
    const payload = await jwt.verify(token, envData.jwt);

    const user = await model.findById(payload._id);
    if (!user) return res.redirect("/auth/google");

    // genrate new token
    const newToken = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        avatar: user.avatar,
        email: user.email,
        role: user.role,
      },
      envData.jwt,
      {
        expiresIn: "1y",
      }
    );

    // send to cookie this token
    res.cookie("auth", newToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 30 * 12,
    });

    // asign use to request object
    req.user = user;

    // next fucntion call
    next();
  } catch (err) {
    return res.redirect("/auth/google");
  }
};

const isAuthRole = (req, res, next) => {
  // cheking user role
  if (req.user.role !== "admin") return res.redirect("/");
  next();
};

const getUserName = async (req, res, next) => {
  // get token from cookie
  const token = req.cookies.auth;
  if (!token) {
    req.user = {};
    next();
  } else {
    const payload = await jwt.verify(token, envData.jwt);
    req.user = payload;
    next();
  }
};

module.exports = {
  isAuth,
  isAuthRole,
  getUserName,
};
