import { useState } from "react"
import blogsService from "../services/blogs"
import { useMutation, useQueryClient } from "@tanstack/react-query"

const Blog = ({ blog, userID }) => {
  const [visible, setvisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  }

  const hideWhenVisible = { ...blogStyle, display: visible ? "none" : "" }
  const showWhenVisible = { ...blogStyle, display: visible ? "" : "none" }

  const toggleShowDetails = () => {
    setvisible(!visible)
  }

  const queryClient = useQueryClient()
  const likeMutation = useMutation({
    mutationFn: blogsService.updateBlogLikes,
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData(["blogs"])
      const newBlogs = blogs.map((blog) => {
        return blog.id === updatedBlog.id ? updatedBlog : blog
      })
      queryClient.setQueryData(["blogs"], newBlogs)
    },
  })

  const deleteMutation = useMutation({
    mutationFn: blogsService.deleteBlog,
    onSuccess: async () => {
      const newBlogs = await blogsService.getAll()
      queryClient.setQueryData(["blogs"], newBlogs)
    },
  })

  return (
    <div className="blog">
      <div
        style={hideWhenVisible}
        className="shownByDefault"
        data-testid={blog.title}
      >
        {blog.title} {blog.author}{" "}
        <button onClick={toggleShowDetails} data-testid="showButton">
          View
        </button>
      </div>
      <div style={showWhenVisible} className="hiddenByDefault">
        {blog.title} <button onClick={toggleShowDetails}>Hide</button> <br />
        <a href={blog.url}> {blog.url}</a> <br />
        <span>{blog.likes} </span>
        {/* users can like */}
        <button onClick={() => likeMutation.mutate(blog)}>like</button> <br />
        {blog.author} <br />
        {userID === (blog.creator.id ? blog.creator.id : blog.creator) ? (
          <button
            onClick={async () => {
              const answer = window.confirm(
                `Are you sure you want to remove: ${blog.title}?`
              )
              if (answer) {
                deleteMutation.mutate(blog)
              }
            }}
          >
            Remove
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}

export default Blog
