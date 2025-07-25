const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    minLength: 3,
  },
  name: String,
  passwordHash: {
    type: String,
    required: true,
    minLength: 3,
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],
});

UserSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
