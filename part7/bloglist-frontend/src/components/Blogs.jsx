import { Link } from "react-router"

const Blogs = ({ blogs }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  }
  return (
    <div className="blog-list">
      {blogs.map((blog) => {
        try {
          // return <Blog key={blog.id} blog={blog} />
          return (
            <div style={blogStyle}>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </div>
          )
        } catch (error) {
          console.log(error)
        }
      })}
    </div>
  )
}

export default Blogs
