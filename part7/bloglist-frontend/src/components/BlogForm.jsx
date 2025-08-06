import { useField } from "../custom-hooks/useHooks"

const BlogForm = ({ handleBlogSubmit }) => {
  const title = useField("text")
  const author = useField("text")
  const url = useField("text")

  const handleFormSubmit = async (event) => {
    event.preventDefault()
    console.log("Form is submitted")

    await handleBlogSubmit({
      title: title.value,
      author: author.value,
      url: url.value,
    })
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
