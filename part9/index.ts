import express from "express"
import { calculateBmi } from "./bmiCalculator"
const app = express()

app.get("/hello", (_req, res) => {
  return res.send("Hello Full Stack!")
})

app.get("/bmi", (req, res) => {
  const height: number = Number(req.query?.height)
  const weight: number = Number(req.query?.weight)
  if (isNaN(height) || isNaN(weight)) {
    return res
      .status(400)
      .send(`Wrong inputs! height: ${height}, weight: ${weight}`)
  }

  const bmiResult = calculateBmi(height, weight)
  return res.send(bmiResult)
})

const PORT = 3000

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
