import axios from "axios"
import { apiBaseUrl } from "../constants"
import { Diagnosis } from "../types"

const diagnosesUrl = `${apiBaseUrl}/diagnoses`
let diagnosesCache: Diagnosis[] = []
let diagnosesCodesCache: string = ""

const getDiagnoses = async (): Promise<Diagnosis[]> => {
  const response = await axios.get<Diagnosis[]>(diagnosesUrl)
  if (response.data) {
    diagnosesCache = response.data
    diagnosesCodesCache = diagnosesCache
      .map((d) => d.code)
      .sort((a, b) => a.localeCompare(b))
      .join(" | ")
    return response.data
  }
  throw new Error("Couldnt fetch diagnoses")
}

const getDiagnosesCodesString = () => diagnosesCodesCache

const initializeCache = async () => {
  await getDiagnoses()
  console.log(diagnosesCodesCache)
}

const getDiagnosisFromCode = (code: string): Diagnosis => {
  const diagnosis = diagnosesCache.find((d) => {
    return d.code === code
  })
  if (diagnosis) {
    return diagnosis
  }
  throw new Error("Couldn't fetch diagnoss with code: " + code)
}

export default {
  getDiagnoses,
  getDiagnosisFromCode,
  diagnosesCache,
  initializeCache,
  getDiagnosesCodesString,
}
