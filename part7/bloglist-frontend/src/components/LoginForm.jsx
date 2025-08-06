import { useState } from "react"
import loginServices from "../services/login"
import config from "../utils/config"
import { useDispatch } from "react-redux"
import blogsService from "../services/blogs"
import { setNotification } from "../reducers/notificationReducer"
import { setUser } from "../reducers/userReducer"
import { useField } from "../custom-hooks/useHooks"

const LoginForm = () => {
  const username = useField("text", "username")
  const password = useField("password", "password")
  const dispatch = useDispatch()
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      // Login
      const user = await loginServices.login({
        username: username.value,
        password: password.value,
      })
      if (user.code === "ERR_BAD_REQUEST") {
        throw user
      }

      // Save the user on the browser storage
      if (user) {
        window.localStorage.setItem(
          config.localStorageUserKey,
          JSON.stringify(user)
        )
        dispatch(setUser(user))
        console.log("user set: ", user)
        blogsService.setToken(user)

        dispatch(
          setNotification({
            message: `Welcome, ${user.name}!`,
            type: "info",
            time_s: 5,
          })
        )
      }
    } catch (error) {
      console.log("Error from Login.jsx:", error)
      dispatch(
        setNotification({
          message: `Error, ${error.response.data.error}!`,
          type: "error",
          time_s: 5,
        })
      )
    }
  }

  return (
    <div>
      <form method="post" onSubmit={handleLogin}>
        <label htmlFor="username">Username </label>
        <input {...username} /> <br />
        <label htmlFor="password">Password </label>
        <input {...password} placeholder="*********" />
        <br />
        <button type="submit">Log in</button>
      </form>
    </div>
  )
}

export default LoginForm
