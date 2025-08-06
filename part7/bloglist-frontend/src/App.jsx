import { useEffect } from "react"
import Blog from "./components/Blog"
import LoginForm from "./components/LoginForm"
import NotificationComponent from "./components/NotificationComponent"
import BlogForm from "./components/BlogForm"
import blogService from "./services/blogs"
import config from "./utils/config"
import Togglable from "./components/Togglable"
import { useRef } from "react"
import NotificationContext from "./contexts/NotificationContext"
import { useContext } from "react"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import UserContext from "./contexts/UserContext"

const App = () => {
  const [_, notificationDispatcher] = useContext(NotificationContext)
  const toggleNewNoteVisibility = useRef()
  const queryClient = useQueryClient()
  const [user, userDispatcher] = useContext(UserContext)

  // Logging in User
  useEffect(() => {
    const userLocal = JSON.parse(
      window.localStorage.getItem(config.localStorageUserKey)
    )
    if (userLocal) {
      userDispatcher(userLocal)
      blogService.setToken(userLocal)
    }
  }, [])

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(["blogs"])
      queryClient.setQueryData(["blogs"], blogs.concat(newBlog))
      toggleNewNoteVisibility.current.toggleVisible()
      const actionShow = {
        type: "SHOW",
        payload: {
          message: `A new Blog added: ${newBlog.title}`,
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
    },
    onError: (error) => {
      notificationDispatcher({
        type: "SHOW",
        payload: {
          message: `Error, could not add the blog. Please log out and log in! The error: ${error.message}`,
          type: "error",
        },
      })
      setTimeout(() => {
        notificationDispatcher({
          type: "HIDE",
        })
      }, 5000)
    },
  })
  const result = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
    retry: 1,
    refetchOnWindowFocus: false,
  })

  if (result.status === "pending") {
    return (
      <div>
        <h3>loading...</h3>
      </div>
    )
  }

  if (result.status === "error") {
    return <h2>blogs service not available due to problems in server</h2>
  }

  const blogs = result.data

  const handleBlogSubmit = ({ title, author, url }) => {
    newBlogMutation.mutate({ title, author, url })
  }
  console.log("app.jsx, user:", user)
  console.log("app.jsx, typeof user:", typeof user)
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
                userDispatcher({ type: "LOGOUT" })
              }}
            >
              {" "}
              Log out
            </button>
          </p>
          <Togglable buttonLabel="New Note" ref={toggleNewNoteVisibility}>
            <BlogForm handleBlogSubmit={handleBlogSubmit} />
          </Togglable>
        </div>
      )}

      <div className="blog-list">
        {blogs.map((blog) => {
          try {
            return (
              <Blog key={blog.id} blog={blog} userID={user ? user.id : null} />
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
