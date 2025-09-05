import { Box, Paper, Typography } from "@mui/material"
import { Entry, Gender, Patient } from "../../types"
import {
  Favorite,
  Female,
  Lightbulb,
  LocalHospital,
  Male,
  MedicalServices,
} from "@mui/icons-material"
import diagnosisService from "../../services/diagnosis"
import WorkIcon from "@mui/icons-material/Work"
import AddEntryForm from "./AddEntryForm"
import { useState } from "react"

interface PatientProps {
  patient: Patient | undefined
}

// utility to ensure exhaustive type checking
const assertNever = (value: never): never => {
  throw new Error(`Unhandled entry type: ${JSON.stringify(value)}`)
}

// component to render entries by type
const EntryDetails = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case "HealthCheck":
      return (
        <Paper elevation={4} key={entry.id} sx={{ p: "10px", my: "4px" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography component="span">{entry.date} </Typography>
            <MedicalServices />
          </Box>
          <Typography fontStyle="italic" variant="subtitle1" my={1}>
            {entry.description}
          </Typography>
          <Box>
            {entry.healthCheckRating === 0 ? (
              <Favorite sx={{ color: "green" }} />
            ) : entry.healthCheckRating === 1 ? (
              <Favorite htmlColor={"yellow"} />
            ) : entry.healthCheckRating === 2 ? (
              <Favorite htmlColor={"orange"} />
            ) : (
              <Favorite htmlColor={"red"} />
            )}
          </Box>
          {entry.diagnosisCodes?.map((code) => (
            <ul key={`${entry.id + code}`}>
              <li>
                {diagnosisService.getDiagnosisFromCode(code).code}{" "}
                {diagnosisService.getDiagnosisFromCode(code).name}
              </li>
            </ul>
          ))}
          <Typography>diagnose by {entry.specialist}</Typography>
        </Paper>
      )

    case "OccupationalHealthcare":
      return (
        <Paper elevation={4} key={entry.id} sx={{ p: "10px", my: "4px" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography component="span">{entry.date} </Typography>
            <Typography component="span" fontStyle="italic">
              <WorkIcon /> {entry.employerName}
            </Typography>
          </Box>
          <Typography fontStyle="italic" variant="subtitle1" my={1}>
            {entry.description}
          </Typography>
          {entry.diagnosisCodes?.map((code) => (
            <ul key={`${entry.id + code}`}>
              <li>
                {diagnosisService.getDiagnosisFromCode(code).code}{" "}
                {diagnosisService.getDiagnosisFromCode(code).name}
              </li>
            </ul>
          ))}
          <Typography>diagnose by {entry.specialist}</Typography>
        </Paper>
      )

    case "Hospital":
      return (
        <Paper elevation={4} key={entry.id} sx={{ p: "10px", my: "4px" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography component="span">{entry.date} </Typography>
            <LocalHospital />
          </Box>
          <Typography fontStyle="italic" variant="subtitle1" my={1}>
            {entry.description}
          </Typography>
          {entry.discharge && (
            <Typography variant="body2">
              Discharged on {entry.discharge.date}: {entry.discharge.criteria}
            </Typography>
          )}
          {entry.diagnosisCodes?.map((code) => (
            <ul key={`${entry.id + code}`}>
              <li>
                {diagnosisService.getDiagnosisFromCode(code).code}{" "}
                {diagnosisService.getDiagnosisFromCode(code).name}
              </li>
            </ul>
          ))}
          <Typography>diagnose by {entry.specialist}</Typography>
        </Paper>
      )

    default:
      return assertNever(entry)
  }
}

const PatientPage = ({ patient }: PatientProps) => {
  const [patientDisplay, setPatientDisplay] = useState(patient)
  if (!patientDisplay) return null

  return (
    <Box>
      <Box>
        <Typography component="h2" variant="h4" fontWeight={600} py={2}>
          {patientDisplay.name}{" "}
          {patientDisplay.gender === Gender.Male ? (
            <Male sx={{ fontSize: "30px" }} />
          ) : patientDisplay.gender === Gender.Female ? (
            <Female sx={{ fontSize: "30px" }} />
          ) : (
            <Lightbulb sx={{ fontSize: "30px" }} />
          )}
        </Typography>
        <Typography variant="body1">ssh: {patientDisplay.ssn}</Typography>
        <Typography variant="body1">
          occupation: {patientDisplay.occupation}
        </Typography>
      </Box>
      <AddEntryForm
        patientID={patientDisplay.id}
        setPatient={setPatientDisplay}
      />
      <Box>
        {patientDisplay.entries.length > 0 && (
          <Typography
            component="h3"
            variant="h5"
            fontWeight={600}
            pt={5}
            pb={1}
          >
            Entries
          </Typography>
        )}
        {patientDisplay.entries.map((entry) => (
          <EntryDetails key={entry.id} entry={entry} />
        ))}
      </Box>
    </Box>
  )
}

export default PatientPage
