const config = require("./utils/config");
const express = require("express");
const mongoose = require("mongoose");
const logger = require("./utils/logger");
const blogsRouter = require("./controllers/blogsRouter");

const app = express();

logger.info("Connecting to DB...");
mongoose.connect(config.MONGODB_URI);

app.use(express.json());

app.use("/api/blogs", blogsRouter);

module.exports = app;
