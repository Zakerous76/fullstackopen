import { NewPatientEntry, NonSensitivePatient, Patient } from "../types"
import patientsData from "../../data/patients"
import { generateId } from "../utils"

export const getNonSensitivePatient = (): NonSensitivePatient[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }))
}

export const createNewPatient = (newPatientEntry: NewPatientEntry): Patient => {
  const id = generateId()
  const newPatient: Patient = { id, ...newPatientEntry }
  return newPatient
}
