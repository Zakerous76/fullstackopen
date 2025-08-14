import React from "react"

const Recommend = (props) => {
  if (!props.show) {
    return null
  }
  const favoriteGenre = props.user.favoriteGenre
  console.log("favoriteGenre:", favoriteGenre)
  const allBooks = props.allBooks.filter((b) => {
    console.log(
      "b.genres.includes(favoriteGenre):",
      b.genres.includes(favoriteGenre)
    )
    return b.genres.includes(favoriteGenre)
  })
  console.log("allBooksss:", allBooks)
  return (
    <div>
      <h2>Recommend</h2>
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
                <td>
                  {a.genres.map((g) => (
                    <span> {g} </span>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Recommend
