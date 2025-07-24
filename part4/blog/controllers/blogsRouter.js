const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const blog = new Blog(request.body);
  const blogKeys = Object.keys(request.body);

  if (
    blogKeys.includes("title") &&
    blogKeys.includes("url") &&
    request.body.title !== "" &&
    request.body.url !== ""
  ) {
    const result = await blog.save();
    response.status(201).json(result);
  } else {
    response
      .status(400)
      .json({ error: "BAD_REQUEST", message: "title or url is missing" });
  }
});

blogsRouter.delete("/:id", async (request, response) => {
  const id = request.params.id;
  await Blog.findByIdAndDelete(id);
  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
  const opts = { runValidators: true, returnDocument: "after" };
  const id = request.params.id;
  const newBlog = request.body;
  try {
    const result = await Blog.findByIdAndUpdate(id, newBlog, opts);
    response.status(200).json(result);
  } catch (error) {
    response
      .status(404)
      .json({ errorName: error.name, message: error.message });
  }
});

module.exports = blogsRouter;
