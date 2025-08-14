/* eslint-disable react/prop-types */
import { useState } from "react"
import { LOGIN } from "../../queries"
import { useMutation } from "@apollo/client"

const Login = (props) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log("Login Failed: ", error.graphQLErrors[0].message)
    },
    onCompleted: () => {
      console.log("Welcome!")
    },
  })
  if (!props.show) {
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await login({
      variables: {
        username,
        password,
      },
    })
    if (result.data) {
      const token = result.data.login.value
      props.setToken(token)
      props.setPage("authors")
      localStorage.setItem("library-user-token", token)

      setPassword("")
      setUsername("")
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          Username:{" "}
          <input
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value)
            }}
          />
        </div>
        <div>
          Password:{" "}
          <input
            type="text"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login
