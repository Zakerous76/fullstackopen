import React, { useState } from "react";
import blogsService from "../services/blogs";

const BlogForm = ({ setBlogs, setErrorMessage }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleBlogSubmit = async (event) => {
    event.preventDefault();
    console.log("Form is submitted");

    try {
      const blog = await blogsService.create({ title, author, url });
      if (blog.code === "ERR_BAD_RESPONSE") {
        throw blog;
      }
      setBlogs((prev) => prev.concat(blog));
      setErrorMessage({
        message: `A new Blog added: ${blog.title}`,
        type: "info",
      });
      setTimeout(() => {
        setErrorMessage({ message: null, type: null });
      }, 5000);
    } catch (error) {
      setErrorMessage({
        message: `Error, could not add the blog. Please log out and log in!`,
        type: "error",
      });
    }
  };
  return (
    <div>
      <form method="post" onSubmit={handleBlogSubmit}>
        <label htmlFor="title">Title: </label>
        <input
          type="text"
          id="title"
          onChange={({ target }) => {
            setTitle(target.value);
          }}
        ></input>
        <br />
        <label htmlFor="author">Author: </label>
        <input
          type="text"
          id="author"
          onChange={({ target }) => {
            setAuthor(target.value);
          }}
        ></input>
        <br />
        <label htmlFor="url">URL: </label>
        <input
          type="text"
          id="url"
          onChange={({ target }) => {
            setUrl(target.value);
          }}
        ></input>
        <br />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default BlogForm;
