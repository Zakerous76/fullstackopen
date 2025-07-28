import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import NotificationComponent from "./components/NotificationComponent";
import BlogForm from "./components/BlogForm";
import blogService from "./services/blogs";
import config from "./utils/config";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState({
    message: null,
    type: null,
  });
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const getBlogs = await blogService.getAll();
        getBlogs.sort((a, b) => b.likes - a.likes);
        setBlogs(getBlogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setErrorMessage({
          message: "Failed to load blogs.",
          type: "error",
        });
      }
    };

    fetchBlogs();
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

  const updateLikes = async (blog) => {
    await blogService.updateBlogLikes(blog);
    const updatedBlogs = await blogService.getAll();
    updatedBlogs.sort((blog1, blog2) => {
      return blog2.likes - blog1.likes;
    });
    setBlogs(updatedBlogs);
  };
  return (
    <div>
      {user === null ? (
        <div className="login-form">
          <NotificationComponent message={errorMessage} />

          <h2>Log in to application</h2>
          <LoginForm setUser={setUser} setErrorMessage={setErrorMessage} />
        </div>
      ) : (
        <div className="create-blog-form">
          <NotificationComponent message={errorMessage} />

          <h2>blogs</h2>

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
          <Togglable buttonLabel="New Note">
            {/* already did that: 5.6 Blog List Frontend, step 6 */}
            <BlogForm setBlogs={setBlogs} setErrorMessage={setErrorMessage} />
          </Togglable>
        </div>
      )}

      <div className="blog-list">
        {blogs.map((blog) => {
          try {
            return <Blog key={blog.id} blog={blog} updateLikes={updateLikes} />;
          } catch (error) {
            console.log(error);
          }
        })}
      </div>
    </div>
  );
};

export default App;
