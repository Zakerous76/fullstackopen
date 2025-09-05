import express, { NextFunction, Request, Response } from "express"
import {
  NewPatientEntry,
  NewPatientSchema,
  NonSensitivePatient,
  Patient,
  PatientResponse,
  Entry,
} from "../types"
import {
  addEntry,
  createNewPatient,
  getNonSensitivePatient,
  getPatient,
  getSensitivePatient,
} from "../services/patientService"
import z from "zod"

const patientRouter = express.Router()

patientRouter.get("/", (_req, res: Response<NonSensitivePatient[]>) => {
  return res.send(getNonSensitivePatient())
})

patientRouter.get("/sensitive", (_req, res: Response<Patient[]>) => {
  return res.send(getSensitivePatient())
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
  "/:id/entries",
  (req, res: Response<Entry | object | undefined>) => {
    const patientID = req.params.id
    if (patientID && getPatient(patientID)) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const body = req.body
      if (body && typeof body === "object" && "diagnosisCodes" in body) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const newEntry: Entry = addEntry(body, patientID)
        return res.status(201).send(newEntry)
      } else {
        return res
          .status(400)
          .json({ error: "please provide the correct entry" })
      }
    }
    return res
      .status(400)
      .json({ error: "please provide a correct patient id" })
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
