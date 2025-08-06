import { useState } from "react"
import loginServices from "../services/login"
import config from "../utils/config"
import blogsService from "../services/blogs"
const LoginForm = ({ setUser, setErrorMessage }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

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
        blogsService.setToken(user)
        setUsername("")
        setPassword("")
        setErrorMessage({ message: `Welcome, ${user.name}!`, type: "info" })
        setTimeout(() => {
          setErrorMessage({ message: null, type: null })
        }, 5000)
      }
    } catch (error) {
      setErrorMessage({
        message: `Error, ${error.response.data.error}!`,
        type: "error",
      })
      setTimeout(() => {
        setErrorMessage({ message: null, type: null })
      }, 5000)
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
