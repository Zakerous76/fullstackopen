import { useState, useEffect } from "react"
import Blog from "./components/Blog"
import LoginForm from "./components/LoginForm"
import NotificationComponent from "./components/NotificationComponent"
import BlogForm from "./components/BlogForm"
import blogService from "./services/blogs"
import config from "./utils/config"
import { useDispatch, useSelector } from "react-redux"
import Togglable from "./components/Togglable"
import { useRef } from "react"
import { setNotification } from "./reducers/notificationReducer"
import {
  createNewBlog,
  fetchBlogs,
  updateBlogLikes,
} from "./reducers/blogsReducer"

import { setUser } from "./reducers/userReducer"

const App = () => {
  const dispatch = useDispatch()
  const [user, blogs] = useSelector(({ user, blogs }) => {
    return [user, blogs]
  })

  const toggleNewNoteVisibility = useRef()

  // Initializing Blogs
  useEffect(() => {
    try {
      dispatch(fetchBlogs())
    } catch (error) {
      console.error("Error fetching blogs:", error)
      dispatch(
        setNotification({
          message: "Failed to load blogs.",
          type: "error",
          time_s: 5,
        })
      )
    }
  }, [])

  // Logging in User
  useEffect(() => {
    const userLocal = JSON.parse(
      window.localStorage.getItem(config.localStorageUserKey)
    )
    if (userLocal) {
      dispatch(setUser(userLocal))
      blogService.setToken(userLocal)
    }
  }, [])

  const handleBlogSubmit = ({ title, author, url }) => {
    try {
      dispatch(createNewBlog({ title, author, url }))
      toggleNewNoteVisibility.current.toggleVisible()
      dispatch(
        setNotification({
          message: `A new Blog added: ${title}`,
          type: "info",
          time_s: 5,
        })
      )
    } catch (error) {
      dispatch(
        setNotification({
          message: `Error, could not add the blog. Please log out and log in!`,
          type: "error",
          time_s: 5,
        })
      )
    }
  }
  return (
    <div>
      {user === null ? (
        <div className="login-form">
          <NotificationComponent />

          <h2>Log in to application</h2>
          <LoginForm />
        </div>
      ) : (
        <div className="create-blog-form">
          <NotificationComponent />

          <h2>blogs</h2>

          <p>
            {user.name} is logged in{" "}
            <button
              onClick={() => {
                dispatch(setUser(null))
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
            return <Blog key={blog.id} blog={blog} />
          } catch (error) {
            console.log(error)
          }
        })}
      </div>
    </div>
  )
}

export default App
