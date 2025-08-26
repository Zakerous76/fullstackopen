import express, { Response } from "express"
import { NonSensitivePatient } from "../types"
import { getNonSensitivePatient } from "../services/patientService"

const patientRouter = express.Router()

patientRouter.get("/", (_req, res: Response<NonSensitivePatient[]>) => {
  return res.send(getNonSensitivePatient())
})

export default patientRouter
