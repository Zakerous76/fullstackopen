import express, { Response } from "express"
import { NonSensitivePatient, PatientResponse } from "../types"
import {
  createNewPatient,
  getNonSensitivePatient,
} from "../services/patientService"

const patientRouter = express.Router()

patientRouter.get("/", (_req, res: Response<NonSensitivePatient[]>) => {
  return res.send(getNonSensitivePatient())
})

patientRouter.post("/", (req, res: Response<PatientResponse>) => {
  const newPatient = createNewPatient(req.body)
  if (newPatient) {
    return res.status(201).send(newPatient)
  }
  return res
    .status(500)
    .json({ error: "Internal server error! Couldn't create new patient" })
})

export default patientRouter
