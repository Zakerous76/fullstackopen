import React, { useState } from "react";
import blogsService from "../services/blogs";

const BlogForm = ({ handleBlogSubmit }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log("Form is submitted");

    handleBlogSubmit({ title, author, url });
  };
  return (
    <div>
      <form method="post" onSubmit={handleFormSubmit}>
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
