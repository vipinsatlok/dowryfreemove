const passport = require("passport");
const { envData } = require("../../config");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const secretData = {
  clientID: envData.googleClientId,
  clientSecret: envData.googleClientSecret,
  callbackURL: envData.googleCallBack,
};

const getUserData = (accessToken, refreshToken, profile, done) => {
  return done(null, profile);
};

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(new GoogleStrategy(secretData, getUserData));

module.exports = passport;
