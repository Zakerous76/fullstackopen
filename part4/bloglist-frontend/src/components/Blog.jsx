import { useState } from "react";

const Blog = ({ blog }) => {
  const [visible, setvisible] = useState(false);

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
        {blog.url} <br />
        {blog.likes} <button>like</button> <br />
        {blog.author}
      </div>
    </div>
  );
};

export default Blog;
