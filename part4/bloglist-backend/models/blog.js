const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: {
    type: Number,
    default: 0,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

blogSchema.set("toJSON", {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
  },
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
