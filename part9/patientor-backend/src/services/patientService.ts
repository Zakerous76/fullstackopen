import { NonSensitivePatient } from "../types"
import patientsData from "../../data/patients"

export const getNonSensitivePatient = (): NonSensitivePatient[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }))
}
