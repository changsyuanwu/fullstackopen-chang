interface ExerciseInputValues {
  target: number;
  dailyExerciseHours: Array<number>;
}

interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseExerciseArguments = (args: Array<string>): ExerciseInputValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (isNaN(Number(args[2]))) throw new Error("Provided values were not numbers!");

  const target = Number(args[2]);
  const dailyExerciseHours: Array<number> = [];

  for (let i = 3; i < args.length; i++) {
    if (isNaN(Number(args[i])))
      throw new Error("Provided values were not numbers!");
    dailyExerciseHours.push(Number(args[i]));
  }

  return {
    target,
    dailyExerciseHours,
  };
};

export const calculateExercises = (
  dailyExerciseHours: Array<number>,
  target: number
): ExerciseResult => {
  const periodLength = dailyExerciseHours.length;
  const trainingDays = dailyExerciseHours.filter((hours) => hours > 0).length;
  const success = dailyExerciseHours.every((hours) => hours >= target);
  const average =
    dailyExerciseHours.reduce((partialSum, hours) => partialSum + hours, 0) /
    periodLength;
  const numberOfDaysTargetReached = dailyExerciseHours.filter(
    (hours) => hours >= target
  ).length;
  let rating: number;
  let ratingDescription: string;
  if (numberOfDaysTargetReached === periodLength) {
    rating = 3;
    ratingDescription =
      "Amazing! You reached the target amount of exercise every day!";
  } else if (numberOfDaysTargetReached >= periodLength / 2) {
    rating = 2;
    ratingDescription =
      "Not bad, you hit the target more often than not. You can do better though.";
  } else {
    rating = 1;
    ratingDescription =
      "You failed to reach the target most of the time. Please work harder.";
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  const { target, dailyExerciseHours } = parseExerciseArguments(process.argv);
  console.log(calculateExercises(dailyExerciseHours, target));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}