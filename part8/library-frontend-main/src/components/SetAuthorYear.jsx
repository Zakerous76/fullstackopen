import { useMutation } from "@apollo/client"
import React, { useState } from "react"
import { GET_AUTHORS, UPDATE_AUTHOR } from "../../queries"
import Select from "react-select"

const SetAuthorYear = ({ authorsOptions }) => {
  const [name, setName] = useState(null)
  const [setBornTo, setSetBornTo] = useState("")

  const [updateAuthor, result] = useMutation(UPDATE_AUTHOR, {
    onError: (error) => {
      console.log("error: ", error)
    },
    update: (cache, response) => {
      cache.updateQuery({ query: GET_AUTHORS }, ({ allAuthors }) => {
        return {
          allAuthors: allAuthors.map((a) =>
            a.name === response.data.editAuthor.name
              ? response.data.editAuthor
              : a
          ),
        }
      })
    },
  })

  const submit = (e) => {
    e.preventDefault()

    updateAuthor({
      variables: {
        name: name.label,
        setBornTo: Number(setBornTo),
      },
      refetchQueries: [{ query: GET_AUTHORS }],
    })

    setSetBornTo("")
  }
  return (
    <div>
      <h3>Set Birthyear</h3>
      <form onSubmit={submit}>
        <div>
          <Select
            defaultValue={name}
            onChange={setName}
            options={authorsOptions}
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
