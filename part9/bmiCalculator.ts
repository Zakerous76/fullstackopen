const calculateBmi = (height: number, weight: number): string => {
  if (!height) return `Please enter valid height: ${height}`
  const bmi = weight / height
  if (bmi < 18.5) {
    return "Underweight"
  } else if (bmi < 25) {
    return "Normal"
  } else if (bmi < 30) {
    return "Overweight"
  } else if (bmi < 35) {
    return "Obese"
  } else if (bmi < 35) {
    return "Extremely Obese"
  }
  return `IDK what you are. Height: ${height} - Weight: ${weight}`
}

console.log(calculateBmi(180, 74))
