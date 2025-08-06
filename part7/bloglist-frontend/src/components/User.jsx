import { Link } from "react-router"

const User = ({ targetUser }) => {
  if (!targetUser) {
    return null
  }
  return (
    <div>
      <h2>{targetUser.name}</h2>
      <h3>Added Blogs</h3>
      <ul>
        {targetUser.blogs.map((blog) => {
          return (
            <li key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default User
