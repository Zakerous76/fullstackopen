import { Diagnosis } from "../types"
import diagnosisData from "../../data/diagnoses"

const getDiagnosis = (): Diagnosis[] => diagnosisData

const getDiagnosisFromCode = (code: string): Diagnosis => {
  const diagnosis = diagnosisData.find((d) => {
    return d.code === code
  })
  if (diagnosis) {
    return diagnosis
  }
  throw new Error(`Diagnosis with code ${code} does not exist in the database.`)
}

export default {
  getDiagnosis,
  getDiagnosisFromCode,
}
