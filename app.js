const express = require("express");
const app = express();
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const passport = require("./src/passport");

// setup view engin and public folder
app.set("view engine", "ejs");
app.use(express.static("public"));

// use passport
app.use(passport.initialize());

// use middlwares for parse data to json
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));
app.use(cookieParser());

// uses session
app.use(
  session({
    secret: process.env.SESSION_SECRET || "satsahebji",
    resave: false,
    saveUninitialized: true,
  })
);

// database connnetion
require("./src/database");

// uses routes
const auth = require("./src/routes/auth");
const render = require("./src/routes/render");
const posts = require("./src/routes/posts");

// routes uses
app.use("/", render);
app.use("/auth", auth);
app.use("/", posts);

app.get("*", (req, res) => {
  res.render("pages/notFound", { user: {} });
});

module.exports = app;
