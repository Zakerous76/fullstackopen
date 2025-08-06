import { useState } from "react"
import { useField } from "../custom-hooks/useHooks"
import blogsService from "../services/blogs"

const Comments = ({ blog }) => {
  const [comment, setComment] = useState("")
  const [comments, setComments] = useState(blog.comments)
  const handleCommentSubmit = (event) => {
    event.preventDefault()
    blogsService.addComment(blog.id, comment)
    setComments((prev) => prev.concat(comment))
    setComment("")
  }
  return (
    <div>
      <h3>Comments</h3>
      <form onSubmit={handleCommentSubmit}>
        <input
          id="comment"
          key="comment"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />
        <button type="submit">Add Comment</button>
      </form>
      <ul>
        {comments.map((comment) => {
          return <li key={comment}>{comment}</li>
        })}
      </ul>
    </div>
  )
}

export default Comments
