import { useDispatch } from "react-redux"
import { updateBlogLikes } from "../reducers/blogsReducer"

const Blog = ({ targetBlog }) => {
  console.log("targetBlog::", targetBlog)
  const dispatch = useDispatch()

  if (!targetBlog) {
    return null
  }
  return (
    <div>
      <h2>{targetBlog.title}</h2>
      <a href={`${targetBlog.url}`}>{targetBlog.url}</a>
      <div>
        {targetBlog.likes} likes{" "}
        <button onClick={() => dispatch(updateBlogLikes(targetBlog))}>
          like
        </button>
      </div>
      <div>{targetBlog.creator.name}</div>
    </div>
  )
}

export default Blog
