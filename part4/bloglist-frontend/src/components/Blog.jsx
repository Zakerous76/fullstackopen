import { useState } from "react";
import blogsService from "../services/blogs";

const Blog = ({ blog, setBlogs }) => {
  const [visible, setvisible] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

  const blogStyle = {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const hideWhenVisible = { ...blogStyle, display: visible ? "none" : "" };
  const showWhenVisible = { ...blogStyle, display: visible ? "" : "none" };

  const toggleShowDetails = () => {
    setvisible(!visible);
  };

  return (
    <div className="blog">
      <div style={hideWhenVisible}>
        {blog.title} {blog.author}{" "}
        <button onClick={toggleShowDetails}>View</button>
      </div>
      <div style={showWhenVisible}>
        {blog.title} <button onClick={toggleShowDetails}>Hide</button> <br />
        <a href="{blog.url}"> {blog.url}</a> <br />
        {blog.likes}{" "}
        <button
          onClick={async () => {
            await blogsService.updateBlogLikes(blog);
            const updatedBlogs = await blogsService.getAll();
            updatedBlogs.sort((blog1, blog2) => {
              return blog2.likes - blog1.likes;
            });
            setBlogs(updatedBlogs);
          }}
        >
          like
        </button>{" "}
        <br />
        {blog.author} <br />
        <button
          onClick={async () => {
            const answer = window.confirm(
              `Are you sure you want to remove: ${blog.title}?`
            );
            if (answer) {
              await blogsService.deleteBlog(blog);

              const updatedBlogs = await blogsService.getAll();
              updatedBlogs.sort((blog1, blog2) => {
                return blog2.likes - blog1.likes;
              });
              setBlogs(updatedBlogs);
            }
          }}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default Blog;
