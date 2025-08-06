const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")

blogsRouter.put("/addCommentSection", async (request, response) => {
  try {
    const result = await Blog.updateMany(
      { comments: { $exists: false } }, // Only update if 'comments' doesn't exist
      { $set: { comments: [] } }
    )
    response.status(200).json({ message: "Comments field added", result })
  } catch (error) {
    response.status(500).json({ error: error.message })
  }
})

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("creator")

  response.json(blogs)
})

blogsRouter.post("/", async (request, response) => {
  const decodedToken = request.user
  console.log("decoded token:", decodedToken)
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" })
  }

  const creator = await User.findById(decodedToken.id)
  if (!creator) {
    return response.status(400).json({ error: "userId missing or not valid" })
  }

  const creatorId = creator._id
  const blog = new Blog(request.body)
  blog.creator = creatorId
  const blogKeys = Object.keys(request.body)
  // Any one user is assigned as the creator
  if (
    blogKeys.includes("title") &&
    blogKeys.includes("url") &&
    request.body.title !== "" &&
    request.body.url !== ""
  ) {
    const savedBlog = await blog.save()
    creator.blogs = creator.blogs.concat(savedBlog._id)
    await creator.save()
    response.status(201).json(savedBlog)
  } else {
    response
      .status(400)
      .json({ error: "BAD_REQUEST", message: "title or url is missing" })
  }
})

blogsRouter.post("/:id/addComment", async (request, response) => {
  const blogId = request.params.id
  const comment = request.body.comment

  try {
    const blog = await Blog.findById(blogId)
    if (!blog) {
      return response.status(404).json({ error: "Blog not found" })
    }

    blog.comments.push(comment)
    const updatedBlog = await blog.save()
    response.status(200).json(updatedBlog)
  } catch (error) {
    response.status(500).json({ error: error.message })
  }
})

blogsRouter.delete("/:id", async (request, response) => {
  const decodedToken = request.user
  console.log("decodedToken: ", decodedToken)

  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" })
  }

  const userId = decodedToken.id
  const blogId = request.params.id
  const blog = await Blog.findById(blogId)
  const blogCreator = blog.creator.toString()
  if (blogCreator !== userId) {
    return response.status(403).json({
      error:
        "The user is unauthorized to delete this blog, only the creator of the blog can.",
    })
  }
  await Blog.findByIdAndDelete(blogId)
  response.status(204).end()
})

blogsRouter.put("/:id", async (request, response) => {
  const opts = { runValidators: true, returnDocument: "after" }
  const id = request.params.id
  const newBlog = request.body
  try {
    const result = await Blog.findByIdAndUpdate(id, newBlog, opts)
    response.status(200).json(result)
  } catch (error) {
    response.status(404).json({ errorName: error.name, message: error.message })
  }
})

module.exports = blogsRouter
