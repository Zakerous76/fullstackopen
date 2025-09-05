import {
  Entry,
  EntrySchema,
  NewPatientEntry,
  NonSensitivePatient,
  Patient,
} from "../types"
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

export const addEntry = (entry: object, patientID: string) => {
  entry = { id: generateId(), ...entry }
  const newEntry: Entry = EntrySchema.parse(entry) as Entry
  patientsDataFull.forEach((p) => {
    if (p.id === patientID) {
      p.entries.push(newEntry)
    }
  })
  return newEntry
}
