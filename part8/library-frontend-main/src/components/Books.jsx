import { useQuery } from "@apollo/client"
import { GET_BOOKS } from "../../queries"
import { useEffect, useState } from "react"

/* eslint-disable react/prop-types */
const Books = (props) => {
  const [booksToShow, setBooksToShow] = useState([])
  const [inGenre, setInGenre] = useState("All")
  let allBooks = null

  const result = useQuery(GET_BOOKS)
  useEffect(() => {
    if (result.data) {
      setBooksToShow(result.data.allBooks)
    }
  }, [result.data])

  useEffect(() => {
    if (allBooks) {
      if (inGenre === "All") {
        setBooksToShow(allBooks)
      } else {
        setBooksToShow(allBooks.filter((b) => b.genres.includes(inGenre)))
      }
    }
  }, [inGenre])

  if (!props.show) {
    return null
  }
  if (result.loading) {
    return <div>Loading...</div>
  }
  allBooks = result.data.allBooks || []
  const genres = [
    ...new Set(
      allBooks.reduce((allGenres, book) => [...allGenres, ...book.genres], [])
    ),
  ]
  genres.push("All")
  console.log("booksToShow:", booksToShow)

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
              <td>
                {a.genres.map((g) => (
                  <span> {g} </span>
                ))}
              </td>
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
