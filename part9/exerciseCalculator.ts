interface ExerciseResult {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

const calculateExercises = (
  exerciseArray: number[],
  target: number
): ExerciseResult => {
  let trainingDays = 0
  let periodLength = 0
  let totalHours = 0
  let rating = 0
  let ratingDescription = ""
  let success = false
  let average = 0

  for (const element of exerciseArray) {
    periodLength++
    if (element > 0) {
      trainingDays++
    }
    totalHours += element
  }
  average = totalHours / periodLength

  if (average <= 0) {
    rating = 0
    ratingDescription = `come on dude!! But thank you for logging <3 : ${rating}`
  } else if (average >= target) {
    rating = 3
    success = true
    ratingDescription = `great job! rating: ${rating}`
  } else if (average < target && average >= target / 2) {
    rating = 2
    ratingDescription = `not too bad but could be better. rating: ${rating}`
  } else {
    rating = 1
    ratingDescription = `we all start somewhere... rating: ${rating}`
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  }
}

console.log(calculateExercises([0], 10))
