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
import { createNewBlog, fetchBlogs } from "./reducers/blogsReducer"
import NotificationContext from "./NotificationContext"
import { setUser } from "./reducers/userReducer"
import { useContext } from "react"

const App = () => {
  const [_, notificationDispatcher] = useContext(NotificationContext)

  const dispatch = useDispatch()
  // 7.13: Redux, Step 4
  const [user, blogs] = useSelector(({ user, blogs }) => {
    return [user, blogs]
  })

  const toggleNewNoteVisibility = useRef()

  // Initializing Blogs
  useEffect(() => {
    try {
      dispatch(fetchBlogs())
    } catch (error) {
      const actionShow = {
        type: "SHOW",
        payload: {
          message: `anecdote '${anecdote.content}' voted`,
          type: "error",
        },
      }
      const actionHide = {
        type: "HIDE",
      }
      console.error("Error fetching blogs:", error)
      notificationDispatcher(actionShow)
      setTimeout(() => {
        notificationDispatcher(actionHide)
      }, 5000)
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
      const actionShow = {
        type: "SHOW",
        payload: {
          message: `A new Blog added: ${title}`,
          type: "info",
        },
      }
      const actionHide = {
        type: "HIDE",
      }
      notificationDispatcher(actionShow)
      setTimeout(() => {
        notificationDispatcher(actionHide)
      }, 5000)
    } catch (error) {
      notificationDispatcher({
        type: "SHOW",
        payload: {
          message: `Error, could not add the blog. Please log out and log in!`,
          type: "error",
        },
      })
      setTimeout(() => {
        notificationDispatcher({
          type: "HIDE",
        })
      }, 5000)
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
