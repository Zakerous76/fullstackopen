import axios from "axios"
import { apiBaseUrl } from "../constants"
import { Diagnosis } from "../types"

const diagnosesUrl = `${apiBaseUrl}/diagnoses`
let diagnosesCache: Diagnosis[] = []

const getDiagnoses = async (): Promise<Diagnosis[]> => {
  const response = await axios.get<Diagnosis[]>(diagnosesUrl)
  if (response.data) {
    diagnosesCache = response.data
    return response.data
  }
  throw new Error("Couldnt fetch diagnoses")
}

const initializeCache = async () => {
  await getDiagnoses()
}

const getDiagnosisFromCode = (code: string): Diagnosis => {
  const diagnosis = diagnosesCache.find((d) => {
    return d.code === code
  })
  if (diagnosis) {
    console.log(diagnosis)
    return diagnosis
  }
  throw new Error("Couldn't fetch diagnoss with code: " + code)
}

export default {
  getDiagnoses,
  getDiagnosisFromCode,
  diagnosesCache,
  initializeCache,
}
