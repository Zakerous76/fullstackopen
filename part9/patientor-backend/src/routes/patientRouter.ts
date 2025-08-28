import express, { NextFunction, Request, Response } from "express"
import {
  NewPatientEntry,
  NewPatientSchema,
  NonSensitivePatient,
  PatientResponse,
} from "../types"
import {
  createNewPatient,
  getNonSensitivePatient,
} from "../services/patientService"
import z from "zod"

const patientRouter = express.Router()

patientRouter.get("/", (_req, res: Response<NonSensitivePatient[]>) => {
  return res.send(getNonSensitivePatient())
})

patientRouter.post(
  "/",
  (
    req: Request<unknown, unknown, NewPatientEntry>,
    res: Response<PatientResponse>
  ) => {
    const newPatient = createNewPatient(NewPatientSchema.parse(req.body))
    return res.status(201).send(newPatient)
  }
)

const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("error:", error)
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues })
  } else {
    next(error)
  }
}

patientRouter.use(errorMiddleware)

export default patientRouter
