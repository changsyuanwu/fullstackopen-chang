import express from "express";
const app = express();
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height: number = Number(req.query.height);
  const weight: number = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    res.status(400).send({ error: "malformatted parameters" });
  } else {
    res.send({
      weight,
      height,
      bmi: calculateBmi(height, weight),
    });
  }
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    res.status(400).send({ error: "parameters missing" });
  }

  if (isNaN(Number(target)) || !Array.isArray(daily_exercises) || daily_exercises.some(isNaN)) {
    res.status(400).send({ error: "malformatted parameters" });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  res.send(calculateExercises(daily_exercises, Number(target)));

});

const PORT = 3004;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
