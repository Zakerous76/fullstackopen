import type { Entry as EntryType } from "../types"
import EntryComponent from "./EntryComponent"
type EntriesListPropType = {
  entries: EntryType[]
}

const EntriesList = (props: EntriesListPropType) => {
  return (
    <div>
      {props.entries.map((entry) => (
        <EntryComponent key={entry.id} entry={entry} />
      ))}
    </div>
  )
}

export default EntriesList
