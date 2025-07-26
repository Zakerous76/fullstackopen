import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import NotificationComponent from "./components/NotificationComponent";
import BlogForm from "./components/BlogForm";
import blogService from "./services/blogs";
import config from "./utils/config";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const userLocal = JSON.parse(
      window.localStorage.getItem(config.localStorageUserKey)
    );
    if (userLocal) {
      setUser(userLocal);
      blogService.setToken(userLocal);
    }
  }, []);
  return (
    <div>
      <NotificationComponent message={errorMessage} />
      {user === null ? (
        <div className="login-form">
          <LoginForm setUser={setUser} />
        </div>
      ) : (
        <div className="create-blog-form">
          <p>
            {user.name} is logged in{" "}
            <button
              onClick={() => {
                setUser(null);
                window.localStorage.removeItem(config.localStorageUserKey);
              }}
            >
              {" "}
              Log out
            </button>
          </p>
          <BlogForm setBlogs={setBlogs} />
        </div>
      )}

      <div className="blog-list">
        <h2>blogs</h2>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default App;
