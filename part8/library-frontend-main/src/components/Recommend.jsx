/* eslint-disable react/prop-types */
import { useQuery } from "@apollo/client"
import { GET_BOOKS } from "../graphql/queries"
import { useEffect, useState } from "react"

const Recommend = (props) => {
  const [allBooks, setAllBooks] = useState([])
  let favoriteGenre
  if (props.user) {
    favoriteGenre = props.user.favoriteGenre
  }
  const result = useQuery(GET_BOOKS, {
    variables: { genre: favoriteGenre },
    skip: !favoriteGenre,
  })

  useEffect(() => {
    if (result.data) {
      setAllBooks(result.data.allBooks)
    }
  }, [result.data])

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>Recommendations</h2>
      <div>
        <h2>books</h2>
        <div>
          books in your favorite genre <b>{favoriteGenre}</b>
        </div>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
              <th>genres</th>
            </tr>
            {allBooks.map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
                <td>{a.genres.join(" ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Recommend
