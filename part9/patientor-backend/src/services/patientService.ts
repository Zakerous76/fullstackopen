import { NonSensitivePatient, Patient } from "../types"
import patientsData from "../../data/patients"
import { generateId, toNewPatientEntry } from "../utils"

export const getNonSensitivePatient = (): NonSensitivePatient[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }))
}

export const createNewPatient = (reqBody: unknown): Patient => {
  const id = generateId()
  const newPatientWithoutID = toNewPatientEntry(reqBody)
  const newPatient: Patient = { id, ...newPatientWithoutID }
  return newPatient
}
