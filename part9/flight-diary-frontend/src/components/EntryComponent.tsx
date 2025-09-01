import type { Entry } from "../types"
type EntryPropType = {
  entry: Entry
}

const EntryComponent = ({ entry }: EntryPropType) => {
  return (
    <div>
      <h4>{entry.date}</h4>
      <p>
        visibility: {entry.visibility} <br />
        weather: {entry.weather}
      </p>
    </div>
  )
}

export default EntryComponent
