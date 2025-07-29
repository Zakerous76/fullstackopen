import { useState } from "react";

const BlogForm = ({ handleBlogSubmit }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log("Form is submitted");

    await handleBlogSubmit({ title, author, url });
    setAuthor("");
    setTitle("");
    setUrl("");
  };

  return (
    <div>
      <form method="post" onSubmit={handleFormSubmit}>
        <label htmlFor="title">Title: </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={({ target }) => {
            setTitle(target.value);
          }}
        ></input>
        <br />
        <label htmlFor="author">Author: </label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={({ target }) => {
            setAuthor(target.value);
          }}
        ></input>
        <br />
        <label htmlFor="url">URL: </label>
        <input
          type="text"
          id="url"
          value={url}
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
