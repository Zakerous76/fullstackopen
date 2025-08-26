import express, { Response } from "express"
import { Diagnosis } from "../types"
import { getDiagnosis } from "../services/diagnosisService"

const diagnosisRouter = express.Router()

diagnosisRouter.get("/", (_req, res: Response<Diagnosis[]>) => {
  return res.send(getDiagnosis())
})

export default diagnosisRouter
