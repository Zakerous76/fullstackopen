import { useEffect } from "react"
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
import { fetchBlogs } from "./reducers/blogsReducer"
import { getAllUsers } from "./reducers/allUsersReducer"
import { setUser } from "./reducers/userReducer"
import { Routes, Route, Link, useMatch } from "react-router"
import Users from "./components/Users"
import Blogs from "./components/Blogs"
import User from "./components/User"
import BlogDetails from "./components/BlogDetails"

const App = () => {
  const dispatch = useDispatch()
  // 7.13: Redux, Step 4
  const [loggedInUser, blogs, allUsers] = useSelector(
    ({ user, blogs, allUsers }) => {
      return [user, blogs, allUsers]
    }
  )

  const toggleNewNoteVisibility = useRef()

  // Initializing Blogs
  useEffect(() => {
    try {
      dispatch(fetchBlogs())
      dispatch(getAllUsers())
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
  const padding = {
    padding: 10,
  }

  const targetUserMatch = useMatch("/users/:id")
  const targetUser = targetUserMatch
    ? allUsers.find((user) => {
        return user.id == targetUserMatch.params.id
      })
    : null

  const targetBlogMatch = useMatch("/blogs/:id")
  const targetBlog = targetBlogMatch
    ? blogs.find((blog) => {
        return blog.id == targetBlogMatch.params.id
      })
    : null
  console.log(targetBlog)
  return (
    <div>
      <div className="navigation">
        <Link style={padding} to="/blogs">
          Blogs
        </Link>
        <Link style={padding} to="/users">
          Users
        </Link>
      </div>

      <div>
        {loggedInUser === null ? (
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
              {loggedInUser.name} is logged in{" "}
              <button
                onClick={() => {
                  dispatch(setUser(null))
                  window.localStorage.removeItem(config.localStorageUserKey)
                }}
              >
                Log out
              </button>
            </p>
            <Togglable buttonLabel="New Note" ref={toggleNewNoteVisibility}>
              {/* already did that: 5.6 Blog List Frontend, step 6 */}
              <BlogForm toggleNewNoteVisibility={toggleNewNoteVisibility} />
            </Togglable>
          </div>
        )}

        <div>
          <Routes>
            <Route path="/blogs" element={<Blogs blogs={blogs} />} />
            <Route path="/users" element={<Users />} />
            <Route
              path="/users/:id"
              element={<User targetUser={targetUser} />}
            />
            <Route
              path="/blogs/:id"
              element={<BlogDetails targetBlog={targetBlog} />}
            />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App
