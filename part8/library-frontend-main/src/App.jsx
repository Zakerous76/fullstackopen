import { useEffect, useState } from "react"
import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import { useApolloClient } from "@apollo/client"
import Login from "./components/Login"

const App = () => {
  const [page, setPage] = useState("authors")
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    setToken(localStorage.getItem("library-user-token"))
  }, [token])

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.clearStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage("login")}>login</button>
        )}
      </div>

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />

      <Login
        show={page === "login" && !token}
        setPage={setPage}
        setToken={setToken}
      />
    </div>
  )
}

export default App
