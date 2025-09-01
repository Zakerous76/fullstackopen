import axios from "axios"
import type { Entry } from "../types"
const baseURL = "/api/diaries"

const getNonSensitiveDiaries = async (): Promise<Entry[]> => {
  const response = await axios.get<Entry[]>(`${baseURL}/non-sensitive`)
  if (response.data) {
    return response.data
  }
  throw new Error("could not fetch diary entries: " + response.status)
}

const createDiary = async (diary: Entry): Promise<Entry> => {
  const response = await axios.post<Entry>(baseURL, diary)
  if (response.data) {
    delete response.data.comment
    return response.data
  }
  throw new Error("couldn't create diary: " + response.status)
}

export default {
  getNonSensitiveDiaries,
  createDiary,
}
