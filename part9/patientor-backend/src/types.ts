import z from "zod"

export enum gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface Entry {
  text: string
}

export type Diagnosis = {
  code: string
  name: string
  latin?: string
}

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
