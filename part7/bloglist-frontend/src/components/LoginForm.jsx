import { useState } from "react"
import loginServices from "../services/login"
import config from "../utils/config"
import { useDispatch } from "react-redux"
import blogsService from "../services/blogs"
import { setNotification } from "../reducers/notificationReducer"

const LoginForm = ({ setUser }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginServices.login({ username, password })
      if (user.code === "ERR_BAD_REQUEST") {
        throw user
      }
      if (user) {
        window.localStorage.setItem(
          config.localStorageUserKey,
          JSON.stringify(user)
        )
        setUser(user)
        console.log("user set: ", user)
        blogsService.setToken(user)
        setUsername("")
        setPassword("")
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
        <input
          type="text"
          name="Username"
          id="username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />{" "}
        <br />
        <label htmlFor="password">Password </label>
        <input
          type="password"
          name="Password"
          id="password"
          value={password}
          placeholder="*********"
          onChange={({ target }) => setPassword(target.value)}
        />
        <br />
        <button type="submit">Log in</button>
      </form>
    </div>
  )
}

export default LoginForm
