const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

blogsRouter.post("/", (request, response) => {
  const blog = new Blog(request.body);
  const blogKeys = Object.keys(request.body);

  if (
    blogKeys.includes("title") &&
    blogKeys.includes("url") &&
    request.body.title !== "" &&
    request.body.url !== ""
  ) {
    blog.save().then((result) => response.status(201).json(result));
  } else {
    response
      .status(400)
      .json({ error: "BAD_REQUEST", message: "title or url is missing" });
  }
});

module.exports = blogsRouter;
