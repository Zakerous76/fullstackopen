import { useDispatch } from "react-redux"
import { updateBlogLikes } from "../reducers/blogsReducer"
import Comments from "./Comments"

const Blog = ({ targetBlog }) => {
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
      <Comments blog={targetBlog} />
    </div>
  )
}

export default Blog
