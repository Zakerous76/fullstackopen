import { useState, useEffect } from "react"
import Blog from "./components/Blog"
import LoginForm from "./components/LoginForm"
import NotificationComponent from "./components/NotificationComponent"
import BlogForm from "./components/BlogForm"
import blogService from "./services/blogs"
import config from "./utils/config"
import Togglable from "./components/Togglable"
import { useRef } from "react"
import { setNotification } from "./reducers/notificationReducer"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const toggleNewNoteVisibility = useRef()

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const getBlogs = await blogService.getAll()
        getBlogs.sort((a, b) => b.likes - a.likes)
        setBlogs(getBlogs)
      } catch (error) {
        console.error("Error fetching blogs:", error)
        setNotification({
          message: "Failed to load blogs.",
          type: "error",
          time_s: 5,
        })
      }
    }

    fetchBlogs()
  }, [])

  useEffect(() => {
    const userLocal = JSON.parse(
      window.localStorage.getItem(config.localStorageUserKey)
    )
    if (userLocal) {
      setUser(userLocal)
      blogService.setToken(userLocal)
    }
  }, [])

  const updateLikes = async (blog) => {
    await blogService.updateBlogLikes(blog)
    const updatedBlogs = await blogService.getAll()
    updatedBlogs.sort((blog1, blog2) => {
      return blog2.likes - blog1.likes
    })
    setBlogs(updatedBlogs)
  }

  const handleBlogSubmit = async ({ title, author, url }) => {
    try {
      const blog = await blogService.create({ title, author, url })
      if (blog.code === "ERR_BAD_RESPONSE") {
        throw blog
      }
      setBlogs((prev) => prev.concat(blog))
      toggleNewNoteVisibility.current.toggleVisible()
      setNotification({
        message: `A new Blog added: ${blog.title}`,
        type: "info",
        time_s: 5,
      })
    } catch (error) {
      setNotification({
        message: `Error, could not add the blog. Please log out and log in!`,
        type: "error",
        time_s: 5,
      })
    }
  }
  return (
    <div>
      {user === null ? (
        <div className="login-form">
          <NotificationComponent />

          <h2>Log in to application</h2>
          <LoginForm setUser={setUser} />
        </div>
      ) : (
        <div className="create-blog-form">
          <NotificationComponent />

          <h2>blogs</h2>

          <p>
            {user.name} is logged in{" "}
            <button
              onClick={() => {
                setUser(null)
                window.localStorage.removeItem(config.localStorageUserKey)
              }}
            >
              {" "}
              Log out
            </button>
          </p>
          <Togglable buttonLabel="New Note" ref={toggleNewNoteVisibility}>
            {/* already did that: 5.6 Blog List Frontend, step 6 */}
            <BlogForm handleBlogSubmit={handleBlogSubmit} />
          </Togglable>
        </div>
      )}

      <div className="blog-list">
        {blogs.map((blog) => {
          try {
            return (
              <Blog
                key={blog.id}
                blog={blog}
                updateLikes={updateLikes}
                setBlogs={setBlogs}
                userID={user ? user.id : null}
              />
            )
          } catch (error) {
            console.log(error)
          }
        })}
      </div>
    </div>
  )
}

export default App
