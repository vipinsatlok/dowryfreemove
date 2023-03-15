const prifix = process.env;

const envData = {
  port: prifix.PORT,
  jwt: prifix.JWT_SECRET,
  session: prifix.SESSION_SECRET,
  cloudnaryName: prifix.CLOUDNARY_NAME,
  cloudnaryKey: prifix.CLOUDNARY_KEY,
  cloudnarySecret: prifix.CLOUDNARY_SECRET,
  mongoUri: prifix.MONGO_URI,
  googleClientId: prifix.CLIENT_ID,
  googleClientSecret: prifix.CLIENT_SECRET,
  googleCallBack: prifix.CALLBACK_URL,
};

module.exports = {
  envData,
};
