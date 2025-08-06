import { useDispatch } from "react-redux"
import { useField } from "../custom-hooks/useHooks"
import { setNotification } from "../reducers/notificationReducer"
import { createNewBlog } from "../reducers/blogsReducer"

const BlogForm = ({ toggleNewNoteVisibility }) => {
  const title = useField("text", "title")
  const author = useField("text", "author")
  const url = useField("text", "url")

  const dispatch = useDispatch()

  const handleFormSubmit = async (event) => {
    event.preventDefault()
    const blog = {
      title: title.value,
      author: author.value,
      url: url.value,
    }
    try {
      dispatch(createNewBlog(blog))
      toggleNewNoteVisibility.current.toggleVisible()
      dispatch(
        setNotification({
          message: `A new Blog added: ${title.value}`,
          type: "info",
          time_s: 5,
        })
      )
    } catch (error) {
      console.log("blogForm.jsx: ", error)
      dispatch(
        setNotification({
          message: `Error, could not add the blog. Please log out and log in!`,
          type: "error",
          time_s: 5,
        })
      )
    }
  }

  return (
    <div>
      <form method="post" onSubmit={handleFormSubmit}>
        <label htmlFor="title">Title: </label>
        <input {...title}></input>
        <br />
        <label htmlFor="author">Author: </label>
        <input {...author}></input>
        <br />
        <label htmlFor="url">URL: </label>
        <input {...url}></input>
        <br />
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default BlogForm
