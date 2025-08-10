import { useMutation } from "@apollo/client"
import React, { useState } from "react"
import { GET_AUTHORS, UPDATE_AUTHOR } from "../../queries"

const SetAuthorYear = () => {
  const [name, setName] = useState("")
  const [setBornTo, setSetBornTo] = useState("")

  const [updateAuthor, result] = useMutation(UPDATE_AUTHOR)

  const submit = (e) => {
    e.preventDefault()

    updateAuthor({
      variables: {
        name,
        setBornTo: Number(setBornTo),
      },
      refetchQueries: [{ query: GET_AUTHORS }],
    })

    setName("")
    setSetBornTo("")
  }
  return (
    <div>
      <h3>Set Birthyear</h3>
      <form onSubmit={submit}>
        <div>
          <label htmlFor="name">Name </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="born">Born </label>
          <input
            type="text"
            id="born"
            value={setBornTo}
            onChange={(event) => setSetBornTo(event.target.value)}
          />
        </div>
        <button type="submit">Update Author</button>
      </form>
    </div>
  )
}

export default SetAuthorYear
