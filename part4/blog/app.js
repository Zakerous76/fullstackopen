const config = require("./utils/config");
const express = require("express");
const mongoose = require("mongoose");
const logger = require("./utils/logger");
const blogsRouter = require("./controllers/blogsRouter");
const usersRouter = require("./controllers/usersRouter");
const {
  requestLogger,
  unknownEndpoint,
  errorHandler,
} = require("./utils/middleware");

const app = express();
app.use(express.json());

app.use(requestLogger);

logger.info("Connecting to DB...");
mongoose.connect(config.MONGODB_URI);

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
