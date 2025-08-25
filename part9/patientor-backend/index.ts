import express from "express"

const app = express()
app.use(express.json())

app.use("/api/ping", (_req, res) => {
  return res.json({ ping: "pong" })
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
