import { useQuery } from "@apollo/client"
import { GET_BOOKS } from "../../queries"
import { useEffect, useState } from "react"

/* eslint-disable react/prop-types */
const Books = (props) => {
  const [booksToShow, setBooksToShow] = useState([{}])
  const [inGenre, setInGenre] = useState("All")
  const [allBooks, setAllBooks] = useState([])

  const result = useQuery(GET_BOOKS)

  const filteredResult = useQuery(GET_BOOKS, {
    variables: { genre: inGenre },
    skip: inGenre === "All",
  })

  useEffect(() => {
    if (filteredResult.data) {
      setBooksToShow(filteredResult.data.allBooks)
    }
  }, [filteredResult.data])

  useEffect(() => {
    if (inGenre === "All") {
      setBooksToShow(allBooks)
    }
  }, [inGenre, allBooks])

  useEffect(() => {
    if (result.data) {
      setAllBooks(result.data.allBooks)
    }
  }, [result.data])

  if (!props.show) {
    return null
  }

  const genres = [
    ...new Set(
      allBooks.reduce((allGenres, book) => [...allGenres, ...book.genres], [])
    ),
  ]
  genres.push("All")

  return (
    <div>
      <h2>books</h2>
      <div>
        in genre <b>{inGenre}</b>
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
            <th>genres</th>
          </tr>
          {booksToShow.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
              <td>{a.genres.join(" ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {genres.map((g) => {
          return (
            <button key={g} onClick={() => setInGenre(g)}>
              {g}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default Books
