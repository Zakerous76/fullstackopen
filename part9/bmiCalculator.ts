interface parsedValues {
  val1: number
  val2: number
}

const parseArguments = (args: string[]): parsedValues => {
  if (args.length > 4) throw new Error("too many arguments")
  if (args.length < 4) throw new Error("not enough arguments")

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      val1: Number(args[2]),
      val2: Number(args[3]),
    }
  }
  throw new Error(
    `NaN values errors | args[0]:${Number(args[0])} | args[1]: ${Number(
      args[1]
    )}`
  )
}

export const calculateBmi = (height: number, weight: number): string => {
  if (!height) return `Please enter valid height: ${height}`
  const bmi = weight / (height / 100) ** 2
  console.log("bmi:", bmi)
  if (bmi < 18.5) {
    return "Underweight"
  } else if (bmi < 25) {
    return "Normal"
  } else if (bmi < 30) {
    return "Overweight"
  } else if (bmi < 35) {
    return "Obese"
  } else if (bmi < 40) {
    return "Extremely Obese"
  }
  return `IDK what you are. Height: ${height} - Weight: ${weight}`
}

const func = () => {
  const { val1, val2 } = parseArguments(process.argv)
  console.log(val1, val2)
  console.log(calculateBmi(val1, val2))
}

// eslint-disable-next-line @typescript-eslint/no-unused-expressions
require.main === module ? func() : null
