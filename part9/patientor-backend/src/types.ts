import z from "zod"

export enum gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

export type Diagnosis = {
  code: string
  name: string
  latin?: string
}

interface BaseEntry {
  id: string
  description: string
  date: string
  specialist: string
  diagnosisCodes?: Array<Diagnosis["code"]>
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck"
  healthCheckRating: HealthCheckRating
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare"
  employerName?: string
  sickLeave?: {
    startDate: string
    endDate: string
  }
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital"
  discharge?: {
    date: string
    criteria: string
  }
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry

export type Patient = {
  id: string
  name: string
  dateOfBirth: string
  ssn: string
  gender: gender
  occupation: string
  entries: Entry[]
}

export type NonSensitivePatient = Omit<Patient, "ssn" | "entries">

export type PatientResponse = Patient | { error: string }

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.enum(gender),
  occupation: z.string(),
  entries: z.array(z.object({ text: z.string() })).default([]),
})

export type NewPatientEntry = z.infer<typeof NewPatientSchema>

type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never
// Define Entry without the 'id' property
export type EntryWithoutId = UnionOmit<Entry, "id">
