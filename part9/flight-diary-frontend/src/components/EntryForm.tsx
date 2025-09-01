import React, { useState } from "react"
import Select from "react-dropdown-select"
import diaryService from "../services/diaryService"
import { Visibility, Weather, type Entry } from "../types"

type EntriesType = {
  setEntries: React.Dispatch<React.SetStateAction<Entry[]>>
}

const visibilityOptions = Object.values(Visibility).map((v) => ({
  value: v,
  label: `visibility - ${v}`,
}))

const weatherOptions = Object.values(Weather).map((w) => ({
  value: w,
  label: `weather - ${w}`,
}))

// Exercise 9.18: Already done

const EntryForm = (props: EntriesType) => {
  const [date, setDate] = useState("")
  const [visibility, setVisibility] = useState(visibilityOptions[0].value)
  const [weather, setWeather] = useState(weatherOptions[0].value)
  const [comment, setComment] = useState("")
  const submitEntry = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    const id = Math.floor(Math.random() * 1000000)
    const entry: Entry = {
      id,
      date,
      visibility,
      weather,
      comment,
    }
    const newEntry: Entry = await diaryService.createDiary(entry)
    props.setEntries((prev) => prev.concat(newEntry))
  }
  return (
    <div>
      <h2>Add New Entry</h2>
      <form onSubmit={submitEntry}>
        <div>
          <label htmlFor="date">date </label>
          <input
            type="date"
            name="date"
            id="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>
        <div>
          <Select
            labelField="label"
            valueField="value"
            options={visibilityOptions}
            values={visibilityOptions}
            name="visibility"
            onChange={(d) => {
              setVisibility(d[0].value)
            }}
          />
        </div>
        <div>
          <Select
            labelField="label"
            valueField="value"
            options={weatherOptions}
            values={weatherOptions}
            name="weather"
            onChange={(d) => {
              setWeather(d[0].value)
            }}
          />
        </div>
        <div>
          <label htmlFor="comment">comment </label>
          <input
            type="text"
            name="comment"
            id="comment"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  )
}

export default EntryForm
