/* eslint-disable react/prop-types */
import { useQuery } from "@apollo/client"
import { GET_AUTHORS } from "../../queries"
import SetAuthorYear from "./SetAuthorYear"

const Authors = (props) => {
  const result = useQuery(GET_AUTHORS)

  if (result.loading) {
    return <div>loading...</div>
  }

  if (!props.show) {
    return null
  }

  const authors = result.data.allAuthors || []
  const authorsOptions = authors.map((a) => {
    return { value: a.name.toLowerCase(), label: a.name }
  })

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <SetAuthorYear authorsOptions={authorsOptions} />
    </div>
  )
}

export default Authors
