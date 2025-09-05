import express, { Response } from "express"
import { Diagnosis } from "../types"
import diagnosisService from "../services/diagnosisService"

const diagnosisRouter = express.Router()

diagnosisRouter.get("/", (_req, res: Response<Diagnosis[]>) => {
  return res.send(diagnosisService.getDiagnosis())
})

diagnosisRouter.get("/:code", (req, res) => {
  const code = req.params.code
  if (code) {
    return res.send(diagnosisService.getDiagnosisFromCode(code))
  }
  return res.status(400).json({ error: "Please provide a diagnosis code" })
})

export default diagnosisRouter
