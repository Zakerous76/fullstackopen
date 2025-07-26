const User = require("../models/user");
const secret = require("../utils/config").SECRET;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginRouter = require("express").Router();

loginRouter.post("/", async (request, response, next) => {
  const { username, password } = request.body;
  const user = await User.findOne({ username: username });
  if (!user) {
    console.log({ error: `User with username '${username} does not exist'` });
    return response
      .status(404)
      .json({ error: `User with username '${username}' does not exist` });
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordCorrect) {
    return response.status(404).json({ error: `Password is incorrect'` });
  }

  const userForToken = {
    username,
    id: user._id,
  };

  const userToken = jwt.sign(userForToken, secret);

  response.status(200).json({
    userToken,
    username,
    name: user.name,
  });
});

module.exports = loginRouter;
