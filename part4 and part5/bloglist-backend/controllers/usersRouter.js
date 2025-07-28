const usersRouter = require("express").Router();
const User = require("../models/user");
const logger = require("../utils/logger");
const bcrypt = require("bcrypt");
const config = require("../utils/config");

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    title: 1,
    author: 1,
  });
  response.status(200).json(users);
});

usersRouter.post("/", async (request, response, next) => {
  const { username, name } = request.body;
  const passwordHash = request.body.password;
  if (passwordHash.length < 3) {
    return response.status(400).json({
      error:
        "User validation failed: password is shorter than the minimum allowed length (3).",
    });
  }

  const salt = 10;
  const passwordHashGen = await bcrypt.hash(passwordHash, salt);
  const newUser = new User({
    username,
    name,
    passwordHash: passwordHashGen,
  });

  try {
    const savedUser = await newUser.save();
    response.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
});

usersRouter.delete("/:id", async (request, response, next) => {
  const userId = request.params.id;
  try {
    await User.findByIdAndDelete(userId);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
