import React from "react"
import Blog from "./Blog"

const Blogs = ({ blogs }) => {
  return (
    <div className="blog-list">
      {blogs.map((blog) => {
        try {
          return <Blog key={blog.id} blog={blog} />
        } catch (error) {
          console.log(error)
        }
      })}
    </div>
  )
}

export default Blogs
