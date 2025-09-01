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

const createDiary = async (diary: Entry): Promise<Entry | string> => {
  try {
    const response = await axios.post<Entry>(baseURL, diary)
    delete response.data.comment
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.status)
      console.error(error.response)
      return "Error: " + error.message + " | Please try again later."
    } else {
      console.error(error)
    }
    throw new Error("Error")
  }
}

export default {
  getNonSensitiveDiaries,
  createDiary,
}
