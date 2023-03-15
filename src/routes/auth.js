const router = require("express").Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const model = require("../models/users");
const { envData } = require("../../config");

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  async (req, res) => {
    // check if user is in my db

    let user;
    user = await model.findOne({ email: req.user.emails[0].value });

    // if not user then create user
    if (!user) {
      const data = {
        email: req.user._json.email,
        avatar: req.user._json.picture,
        name: req.user._json.name,
      };
      user = await model.create(data);
    }

    // create token
    const token = jwt.sign(
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

    res.cookie("auth", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 30 * 12,
    });

    res.redirect("/");
  }
);

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.clearCookie("auth");
  res.redirect("/");
});

module.exports = router;
