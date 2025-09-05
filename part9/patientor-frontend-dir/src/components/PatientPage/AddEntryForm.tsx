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
import { EntryFormValues, Patient } from "../../types"
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

const entryTypes = [
  {
    value: 0,
    label: "HealthCheck",
  },
  {
    value: 1,
    label: "OccupationalHealthcare",
  },
  {
    value: 2,
    label: "Hospital",
  },
]

interface AddEntryFormProps {
  patientID: string
  setPatient: React.Dispatch<React.SetStateAction<Patient | undefined>>
}

enum NotificationTypes {
  "error" = 0,
  "success" = 1,
}

const AddEntryForm = (props: AddEntryFormProps) => {
  const [description, setDescription] = useState("")
  const [date, setDate] = useState<string>("")
  const [specialist, setSpecialist] = useState("")
  const [healthCheckRating, setHealthCheckRating] = useState(0)
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>()
  const [notification, setNotification] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState("")
  const [notificationType, setNotificationType] = useState<NotificationTypes>(0)
  const [employerName, setEmployerName] = useState("")
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState("")
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState("")
  const [dischargeDate, setDischargeDate] = useState("")
  const [dischargeCriteria, setDischargeCriteria] = useState("")
  const [entryType, setEntryType] = useState<number>(0)

  const validCodes = diagnosisService.getDiagnosesCodesString()

  const resetStates = () => {
    setDescription("")
    setDiagnosisCodes([""])
    setSpecialist("")
    setHealthCheckRating(0)
    setEmployerName("")
    setSickLeaveStartDate("")
    setSickLeaveEndDate("")
    setDischargeDate("")
    setDischargeCriteria("")
  }

  const notify = (message: string, type: number) => {
    setNotificationMessage(message)
    setNotificationType(type)

    setNotification(true)
    setTimeout(() => {
      setNotification(false)
    }, 4000)
  }

  const submitEntry = async (event: React.SyntheticEvent) => {
    event.preventDefault()

    let newEntry: EntryFormValues | undefined

    if (
      diagnosisCodes?.some((code) => {
        return !validCodes.includes(code)
      })
    ) {
      notify(
        "Please enter one of the valid Diagnosis Codes",
        NotificationTypes.error
      )
      return null
    }

    switch (entryType) {
      case 0:
        newEntry = {
          date,
          specialist,
          description,
          type: "HealthCheck",
          diagnosisCodes,
          healthCheckRating,
        }
        break
      case 1:
        newEntry = {
          date,
          specialist,
          description,
          type: "OccupationalHealthcare",
          diagnosisCodes,
          sickLeave: {
            startDate: sickLeaveStartDate,
            endDate: sickLeaveEndDate,
          },
        }
        break

      case 2:
        newEntry = {
          date,
          specialist,
          description,
          type: "Hospital",
          diagnosisCodes,
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria,
          },
        }
        break

      default:
        break
    }
    if (newEntry) {
      console.log(newEntry)
      const newEntryResponse = await patientsService.addEntry(
        newEntry,
        props.patientID
      )
      if (typeof newEntryResponse === "string") {
        notify(
          "An error occurred while creating entry, please double check the entered data",
          0
        )
        return null
      }
      props.setPatient((prev) => {
        if (!prev) return prev // handle undefined
        return {
          ...prev,
          entries: [...prev.entries, newEntryResponse],
        }
      })

      notify("Entry created successfully!", NotificationTypes.success)
      resetStates()
    }
  }

  const HealthCheckEntry = (
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
              label="Date"
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
            helperText={`Valid codes: ${validCodes}`}
          ></TextField>

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
  const OccupationalHealthcareEntry = (
    <Paper sx={{ p: "20px" }}>
      <Typography component="h3" variant="h5" fontWeight={600} mb={2}>
        New OccupationalHealthcare Entry
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
              label="Date"
              onAccept={(value) =>
                setDate(value ? value.format("YYYY-MM-DD") : "")
              }
            />
            <DatePicker
              label="Sick Leave Start Date"
              onAccept={(value) =>
                setSickLeaveStartDate(value ? value.format("YYYY-MM-DD") : "")
              }
            />
            <DatePicker
              label="Sick Leave End Date"
              onAccept={(value) =>
                setSickLeaveEndDate(value ? value.format("YYYY-MM-DD") : "")
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
            value={employerName}
            onChange={(event) => setEmployerName(event.target.value)}
            label="Employer Name"
          ></TextField>
          <TextField
            variant="outlined"
            value={diagnosisCodes}
            onChange={(event) => {
              const values = event.target.value.split(",").map((code) => {
                return code.trim()
              })
              setDiagnosisCodes(values)
            }}
            label="Diagnosis Codes"
            helperText={validCodes}
          ></TextField>

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
  const HospitalEntry = (
    <Paper sx={{ p: "20px" }}>
      <Typography component="h3" variant="h5" fontWeight={600} mb={2}>
        New Hospital Entry
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
              label="Date"
              onAccept={(value) =>
                setDate(value ? value.format("YYYY-MM-DD") : "")
              }
            />
            <DatePicker
              label="Discharge Date"
              onAccept={(value) => {
                const date = value ? value.format("YYYY-MM-DD") : ""
                console.log("date:", date)
                setDischargeDate(date)
              }}
            />
          </LocalizationProvider>
          <TextField
            variant="outlined"
            value={dischargeCriteria}
            onChange={(event) => setDischargeCriteria(event.target.value)}
            label="Discharge Criteria"
          ></TextField>
          <TextField
            variant="outlined"
            value={specialist}
            onChange={(event) => setSpecialist(event.target.value)}
            label="Specialist"
          ></TextField>

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

  return (
    <Stack mt={3}>
      <Box>
        <TextField
          variant="outlined"
          label="Entry Type"
          type="number"
          select
          defaultValue={healthCheckRatingValues[0].value}
        >
          {entryTypes.map((option) => (
            <MenuItem
              key={option.value}
              value={option.value}
              onClick={() => {
                console.log("option.value:", option.value)
                setEntryType(option.value)
              }}
            >
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      {(() => {
        switch (entryType) {
          case 0:
            return HealthCheckEntry
          case 1:
            return OccupationalHealthcareEntry
          case 2:
            return HospitalEntry
          default:
            return <></>
        }
      })()}
      {notification && notificationType === 0 && (
        <Alert severity="error">{notificationMessage}</Alert>
      )}
      {notification && notificationType === 1 && (
        <Alert severity="success">{notificationMessage}</Alert>
      )}
    </Stack>
  )
}

export default AddEntryForm
