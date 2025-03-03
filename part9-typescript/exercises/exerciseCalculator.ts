interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

function calculateExercises(dailyExerciseHours: Array<number>, target: number): ExerciseResult {
  const periodLength = dailyExerciseHours.length;
  const trainingDays = dailyExerciseHours.filter((hours) => hours > 0).length;
  const success = dailyExerciseHours.every((hours) => hours >= target);
  const average = dailyExerciseHours.reduce((partialSum, hours) => partialSum + hours, 0) / periodLength;
  const numberOfDaysTargetReached = dailyExerciseHours.filter((hours) => hours >= target).length;
  let rating: number;
  let ratingDescription: string;
  if (numberOfDaysTargetReached === periodLength) {
    rating = 3;
    ratingDescription = "Amazing! You reached the target amount of exercise every day!"
  }
  else if (numberOfDaysTargetReached >= periodLength / 2) {
    rating = 2;
    ratingDescription = "Not bad, you hit the target more often than not. You can do better though."
  }
  else {
    rating = 1;
    ratingDescription = "You failed to reach the target most of the time. Please work harder."
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  }
}

console.log(calculateExercises(
  [0, 5, 2, 0, 7, 3, 10],
  10
));