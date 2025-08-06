import { useState } from "react"
import blogsService from "../services/blogs"
import { useDispatch, useSelector } from "react-redux"
import { fetchBlogs, updateBlogLikes } from "../reducers/blogsReducer"

const BlogOld = ({ blog }) => {
  const dispatch = useDispatch()
  const userID = useSelector(({ user }) => (user ? user.id : null))

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
        <button onClick={() => dispatch(updateBlogLikes(blog))}>
          like
        </button>{" "}
        <br />
        {blog.author} <br />
        {userID === (blog.creator.id ? blog.creator.id : blog.creator) ? (
          <button
            onClick={async () => {
              const answer = window.confirm(
                `Are you sure you want to remove: ${blog.title}?`
              )
              if (answer) {
                // users can delete
                await blogsService.deleteBlog(blog)
                dispatch(fetchBlogs())
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

export default BlogOld
