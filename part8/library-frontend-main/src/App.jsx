import { useEffect, useState } from "react"
import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import { useApolloClient, useQuery } from "@apollo/client"
import Login from "./components/Login"
import { CURRENT_USER, GET_BOOKS } from "../queries"
import Recommend from "./components/Recommend"

const App = () => {
  const [page, setPage] = useState("authors")
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)

  const client = useApolloClient()
  const currentUserResult = useQuery(CURRENT_USER, {
    onError: (error) => {
      console.log("Couldn't get currentUser:", error)
    },
  })

  const allBooksResult = useQuery(GET_BOOKS)
  const allBooks = allBooksResult.loading ? [] : allBooksResult.data.allBooks
  console.log("allBooks:", allBooks)

  useEffect(() => {
    if (currentUserResult.data) {
      setUser(currentUserResult.data.me)
    }
  }, [currentUserResult.data, currentUserResult.loading])

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
            <button onClick={() => setPage("recommend")}>recommend</button>
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

      <Recommend show={page === "recommend"} user={user} allBooks={allBooks} />
    </div>
  )
}

export default App
