import { useContext } from "react"
import UserContext from "../contexts/UserContext"
import NotificationContext from "../contexts/NotificationContext"
import loginService from "../services/login"

const LoginForm = () => {
  const [_, userDispatcher] = useContext(UserContext)
  const [__, notificationDispatcher] = useContext(NotificationContext)

  const handleLogin = async (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value

    try {
      const user = await loginService.login({ username, password })
      userDispatcher({ type: "LOGIN", payload: user })
      notificationDispatcher({
        type: "SHOW",
        payload: {
          message: `Welcome, ${user.name}!`,
          type: "info",
        },
      })
      setTimeout(() => {
        notificationDispatcher({ type: "HIDE" })
      }, 5000)
    } catch (error) {
      notificationDispatcher({
        type: "SHOW",
        payload: {
          message: "Login failed. Check your credentials.",
          type: "error",
        },
      })
      setTimeout(() => {
        notificationDispatcher({ type: "HIDE" })
      }, 5000)
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        username <input name="username" />
      </div>
      <div>
        password <input name="password" type="password" />
      </div>
      <button type="submit">Login</button>
    </form>
  )
}

export default LoginForm
