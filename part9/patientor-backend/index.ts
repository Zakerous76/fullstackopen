import express from "express"
import cors from "cors"

import diagnosisRouter from "./src/routes/diagnosisRouter"

const app = express()
app.use(express.json())

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
)

app.use("/api/ping", (_req, res) => {
  return res.json({ ping: "pong" })
})

app.use("/api/diagnoses", diagnosisRouter)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
