const BlogDetails = ({ targetBlog }) => {
  console.log("targetBlog::", targetBlog)

  if (!targetBlog) {
    return null
  }
  return (
    <div>
      <h2>{targetBlog.title}</h2>
      <a href={`${targetBlog.url}`}>{targetBlog.url}</a>
      <div>{targetBlog.likes} likes</div>
      <div>{targetBlog.creator.name}</div>
    </div>
  )
}

export default BlogDetails
