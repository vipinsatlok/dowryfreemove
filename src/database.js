const mongoose = require("mongoose");
const { envData } = require("../config");

// enable strict mode for queries
mongoose.set("strict", false);

async function connectToDatabase() {
  try {
    // connect to the MongoDB database
    await mongoose.connect(envData.mongoUri);
    console.log("Connected to the database");
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
  }
}

connectToDatabase();
