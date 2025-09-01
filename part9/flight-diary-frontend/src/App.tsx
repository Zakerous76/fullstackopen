import { useEffect, useState } from "react"
import EntriesList from "./components/EntriesList"
import EntryForm from "./components/EntryForm"
import type { Entry } from "./types"
import diaryService from "./services/diaryService"

const App = () => {
  const [entries, setEntries] = useState<Entry[]>([])
  useEffect(() => {
    diaryService.getNonSensitiveDiaries().then((data) => {
      setEntries(data)
    })
  }, [])

  return (
    <div>
      <EntryForm setEntries={setEntries} />
      <EntriesList entries={entries} />
    </div>
  )
}

export default App
