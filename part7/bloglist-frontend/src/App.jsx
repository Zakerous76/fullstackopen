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

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

const App = () => {
  const [_, notificationDispatcher] = useContext(NotificationContext)

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

  const dispatch = useDispatch()
  const user = useSelector(({ user }) => {
    return user
  })

  const toggleNewNoteVisibility = useRef()
  const queryClient = useQueryClient()
  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(["blogs"])
      queryClient.setQueryData(["blogs"], blogs.concat(newBlog))
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
    newBlogMutation.mutate({ title, author, url })
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
