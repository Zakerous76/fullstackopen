import { Box, Typography } from "@mui/material"
import { Gender, Patient } from "../../types"
import { Female, Lightbulb, Male } from "@mui/icons-material"

interface PatientProps {
  patient: Patient | undefined
}

const PatientPage = (props: PatientProps) => {
  return (
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
  )
}

export default PatientPage
