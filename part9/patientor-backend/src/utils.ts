import { isStringObject } from "util/types"
import { gender } from "./types"
import { NewPatientEntry } from "./types"
import { v4 as uuid } from "uuid"

const isString = (param: unknown): param is string => {
  if (!param || typeof param !== "string" || isStringObject(param)) {
    throw new Error("Provide `param` or param is not string: " + param)
  }
  return true
}

const isGender = (param: unknown): param is gender => {
  if (!isString(param)) {
    throw Error("Provide `param` or param is not string: " + param)
  }
  return Object.values(gender)
    .map((v) => v.toString())
    .includes(param.toLowerCase())
}

const parseName = (name: unknown): string => {
  const isStr = isString(name)
  if (isStr) {
    return name
  }
  throw new Error("`name` is not a string")
}

const parseOccupation = (occupation: unknown): string => {
  const isStr = isString(occupation)
  if (isStr) {
    return occupation
  }
  throw new Error("`occupation` is not a string")
}

const parseDateOfBirth = (date: unknown): string => {
  const isStr = isString(date)
  if (isStr) {
    return String(Date.parse(date))
  }
  throw new Error("`date` is not a string")
}

const parseSSN = (ssn: unknown): string => {
  if (isString(ssn)) {
    return ssn
  }
  throw new Error("`ssn` is not a string")
}

const parseGender = (genderParam: unknown): gender => {
  if (isGender(genderParam)) {
    return genderParam
  }
  const genders = Object.values(gender).map((v) => v.toLowerCase())
  throw new Error(
    `"gender '${genderParam}'" is not a valid gender (${genders})`
  )
}

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data: " + object)
  }
  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const newPatient: NewPatientEntry = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      gender: parseGender(object.gender),
      ssn: parseSSN(object.ssn),
      occupation: parseOccupation(object.occupation),
    }
    return newPatient
  }
  throw new Error("Incomplete Object: " + Object.keys(object).join(" | "))
}

export const generateId = (): string => {
  const id = uuid()
  if (typeof id !== "string") {
    throw new Error("UUID generation failed")
  }
  return id
}
