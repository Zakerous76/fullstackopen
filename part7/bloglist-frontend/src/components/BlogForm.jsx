import { useDispatch } from "react-redux"
import { useField } from "../custom-hooks/useHooks"
import { setNotification } from "../reducers/notificationReducer"
import { createNewBlog } from "../reducers/blogsReducer"
import { Button, TextField } from "@mui/material"

const BlogForm = ({ toggleNewNoteVisibility }) => {
  const title = useField("text", "title")
  const author = useField("text", "author")
  const url = useField("text", "url")

  const dispatch = useDispatch()

  const handleFormSubmit = async (event) => {
    event.preventDefault()
    const blog = {
      title: title.inputProps.value,
      author: author.inputProps.value,
      url: url.inputProps.value,
    }
    try {
      dispatch(createNewBlog(blog))
      toggleNewNoteVisibility.current.toggleVisible()
      dispatch(
        setNotification({
          message: `A new Blog added: ${title.inputProps.value}`,
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
    title.reset()
    author.reset()
    url.reset()
  }

  return (
    <div>
      <form method="post" onSubmit={handleFormSubmit}>
        <div>
          <TextField label="title" {...title.inputProps} />
        </div>
        <div>
          <TextField label="author" {...author.inputProps} />
        </div>
        <div>
          <TextField label="url" {...url.inputProps} />
        </div>
        <Button variant="contained" color="primary" type="submit">
          Create
        </Button>
      </form>
    </div>
  )
}

export default BlogForm
