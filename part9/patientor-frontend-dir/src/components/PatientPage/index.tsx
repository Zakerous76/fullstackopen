import { Box, Typography } from "@mui/material"
import { Entry, Gender, Patient } from "../../types"
import { Female, Lightbulb, Male } from "@mui/icons-material"
import diagnosisService from "../../services/diagnosis"

interface PatientProps {
  patient: Patient | undefined
}

const PatientPage = (props: PatientProps) => {
  return (
    <Box>
      <Box>
        <Typography component="h2" variant="h4" fontWeight={600} py={2}>
          {props.patient?.name}{" "}
          {props.patient?.gender === Gender.Male ? (
            <Male sx={{ fontSize: "30px" }} />
          ) : props.patient?.gender === Gender.Female ? (
            <Female sx={{ fontSize: "30px" }} />
          ) : (
            <Lightbulb sx={{ fontSize: "30px" }} />
          )}
        </Typography>
        <Typography variant="body1">ssh: {props.patient?.ssn}</Typography>
        <Typography variant="body1">
          occupation: {props.patient?.occupation}
        </Typography>
      </Box>
      <Box>
        {props.patient?.entries ? (
          props.patient.entries.length > 0 ? (
            <Typography
              component="h3"
              variant="h5"
              fontWeight={600}
              pt={5}
              pb={1}
            >
              {" "}
              Entries
            </Typography>
          ) : null
        ) : null}
        {props.patient?.entries.map((entry: Entry) => (
          <Box key={entry.id}>
            <Typography variant="body1" my={0}>
              {entry.date} {entry.description}
            </Typography>
            <ul>
              {entry.diagnosisCodes?.map((code) => (
                <li key={`${entry.id + code}`}>
                  {diagnosisService.getDiagnosisFromCode(code).code}{" "}
                  {diagnosisService.getDiagnosisFromCode(code).name}
                </li>
              ))}
            </ul>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default PatientPage
