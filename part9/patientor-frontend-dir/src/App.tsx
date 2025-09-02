import { useState, useEffect } from "react"
import axios from "axios"
import { Route, Link, Routes, useMatch } from "react-router-dom"
import { Button, Divider, Container, Typography } from "@mui/material"

import { apiBaseUrl } from "./constants"
import { Patient } from "./types"

import patientService from "./services/patients"
import PatientListPage from "./components/PatientListPage"
import PatientPage from "./components/PatientPage"

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([])
  let patient: Patient | undefined

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`)

    const fetchPatientList = async () => {
      const patients = await patientService.getAllSensitive()
      setPatients(patients)
    }
    void fetchPatientList()
  }, [])

  const patientID = useMatch("/patients/:id")?.params.id
  if (patientID) {
    patient = patients.find((p) => {
      return p.id === patientID
    })
  }

  return (
    <div className="App">
      <Container>
        <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
          Patientor
        </Typography>
        <Button component={Link} to="/" variant="contained" color="primary">
          Home
        </Button>
        <Divider hidden />
        <Routes>
          <Route
            path="/"
            element={
              <PatientListPage patients={patients} setPatients={setPatients} />
            }
          />
          <Route
            path="/patients/:id"
            element={<PatientPage patient={patient} />}
          />
        </Routes>
      </Container>
    </div>
  )
}

export default App
