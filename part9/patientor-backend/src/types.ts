import z from "zod"

export enum gender {
  Male = "male",
  Female = "female",
  Other = "other",
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
}

export type NonSensitivePatient = Omit<Patient, "ssn">

export type PatientResponse = Patient | { error: string }

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.enum(gender),
  occupation: z.string(),
})

export type NewPatientEntry = z.infer<typeof NewPatientSchema>
