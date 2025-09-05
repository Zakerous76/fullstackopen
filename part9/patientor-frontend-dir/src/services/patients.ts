import axios from "axios"
import { Entry, EntryFormValues, Patient, PatientFormValues } from "../types"

import { apiBaseUrl } from "../constants"

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`)

  return data
}

const getAllSensitive = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients/sensitive`
  )

  return data
}

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object)

  return data
}

const addEntry = async (entry: EntryFormValues, patientId: string) => {
  const { data } = await axios.post<Entry>(
    `${apiBaseUrl}/patients/${patientId}/entries`,
    entry
  )
  return data
}

export default {
  getAll,
  create,
  getAllSensitive,
  addEntry,
}
