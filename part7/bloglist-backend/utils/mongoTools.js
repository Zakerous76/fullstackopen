const config = require("./config");
const mongoose = require("mongoose");
const logger = require("./logger");
const connectToDB = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI);
    logger.info("Connected to MongoDB");
  } catch (error) {
    logger.error("Error connecting to MongoDB:", error.message);
  }
};

module.exports = { connectToDB };
