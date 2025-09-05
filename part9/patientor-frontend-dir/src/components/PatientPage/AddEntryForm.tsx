import {
  Alert,
  Box,
  Button,
  FormControl,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"

import { useState } from "react"
import patientsService from "../../services/patients"
import { Patient } from "../../types"
import diagnosisService from "../../services/diagnosis"

const healthCheckRatingValues = [
  {
    value: 0,
    label: "Healthy",
  },
  {
    value: 1,
    label: "LowRisk",
  },
  {
    value: 2,
    label: "HighRisk",
  },
  {
    value: 3,
    label: "CriticalRisk",
  },
]

interface AddEntryFormProps {
  patientID: string
  setPatient: React.Dispatch<React.SetStateAction<Patient | undefined>>
}

const AddEntryForm = (props: AddEntryFormProps) => {
  const [description, setDescription] = useState("")
  const [date, setDate] = useState<string>("")
  const [specialist, setSpecialist] = useState("")
  const [healthCheckRating, setHealthCheckRating] = useState(0)
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>()
  const [notification, setNotification] = useState(false)

  const validCodes = diagnosisService.getDiagnosesCodesString()

  const resetStates = () => {
    setDescription("")
    setDiagnosisCodes([""])
    setSpecialist("")
    setHealthCheckRating(0)
  }

  const submitEntry = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    console.log("Date:", date)

    const newEntry = {
      date,
      specialist,
      description,
      type: "HealthCheck",
      diagnosisCodes,
      healthCheckRating,
    }
    console.log(newEntry)
    const newEntryResponse = await patientsService.addEntry(
      {
        date,
        specialist,
        description,
        type: "HealthCheck",
        diagnosisCodes,
        healthCheckRating,
      },
      props.patientID
    )

    props.setPatient((prev) => {
      if (!prev) return prev // handle undefined
      return {
        ...prev,
        entries: [...prev.entries, newEntryResponse],
      }
    })
    setNotification(true)
    setTimeout(() => {
      setNotification(false)
    }, 2000)
    resetStates()
  }

  return (
    <Paper sx={{ p: "20px" }}>
      <Typography component="h3" variant="h5" fontWeight={600} mb={2}>
        New HealthCheck Entry
      </Typography>
      <FormControl>
        <Stack gap={1}>
          <TextField
            variant="outlined"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            label="Description"
          ></TextField>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              onAccept={(value) =>
                setDate(value ? value.format("YYYY-MM-DD") : "")
              }
            />
          </LocalizationProvider>
          <TextField
            variant="outlined"
            value={specialist}
            onChange={(event) => setSpecialist(event.target.value)}
            label="Specialist"
          ></TextField>
          <TextField
            variant="outlined"
            value={healthCheckRating}
            onChange={(event) =>
              setHealthCheckRating(Number(event.target.value))
            }
            label="HealthCheck Rating"
            type="number"
            select
            defaultValue={healthCheckRatingValues[0].value}
          >
            {healthCheckRatingValues.map((option) => (
              <MenuItem
                key={option.value}
                value={option.value}
                onClick={() => {
                  console.log(option.value)
                  setHealthCheckRating(option.value)
                }}
              >
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            variant="outlined"
            value={diagnosisCodes}
            onChange={(event) => {
              const values = event.target.value.split(",").map((code) => {
                return code.trim()
              })
              console.log(values)
              setDiagnosisCodes(values)
            }}
            label="Diagnosis Codes"
            helperText={validCodes}
          ></TextField>
          {notification ? (
            <Alert severity="success">This is a success Alert.</Alert>
          ) : (
            <></>
          )}

          <Box>
            <Button
              variant="contained"
              type="submit"
              sx={{ mr: "10px" }}
              onClick={submitEntry}
            >
              Create
            </Button>
            <Button
              variant="contained"
              type="reset"
              color="error"
              onClick={resetStates}
            >
              Cancel
            </Button>
          </Box>
        </Stack>
      </FormControl>
    </Paper>
  )
}

export default AddEntryForm
