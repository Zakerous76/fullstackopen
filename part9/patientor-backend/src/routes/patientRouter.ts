import express, { NextFunction, Request, Response } from "express"
import {
  NewPatientEntry,
  NewPatientSchema,
  NonSensitivePatient,
  Patient,
  PatientResponse,
} from "../types"
import {
  createNewPatient,
  getNonSensitivePatient,
  getPatient,
} from "../services/patientService"
import z from "zod"

const patientRouter = express.Router()

patientRouter.get("/", (_req, res: Response<NonSensitivePatient[]>) => {
  return res.send(getNonSensitivePatient())
})

patientRouter.get(
  "/:id",
  (req, res: Response<Patient | object | undefined>) => {
    const patientID = req.params.id
    if (patientID) {
      const patient = getPatient(patientID)
      return res.status(200).send(patient)
    }
    return res.status(400).json({ error: "please provide an id" })
  }
)

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
