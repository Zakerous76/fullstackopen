import { NewPatientEntry, NonSensitivePatient, Patient } from "../types"
import patientsDataFull from "../../data/patients-full"
import { generateId } from "../utils"

export const getNonSensitivePatient = (): NonSensitivePatient[] => {
  return patientsDataFull.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  )
}

export const getSensitivePatient = (): Patient[] => {
  return patientsDataFull
}

export const getPatient = (id: string): Patient | undefined => {
  return patientsDataFull.find((patient) => patient.id === id)
}

export const createNewPatient = (newPatientEntry: NewPatientEntry): Patient => {
  const id = generateId()
  const newPatient: Patient = { id, ...newPatientEntry }
  return newPatient
}
