import express from "express";
const app = express();
import { calculator, Operation } from "./calculator";

app.use(express.json());

app.get("/ping", (_req, res) => {
  res.send("pong");
});

app.post("/calculate", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { value1, value2, op } = req.body;

  if (!value1 || !value2 || !op) {
    res.status(400).send({ error: "parameters missing" });
  }

  if (isNaN(Number(value1)) || isNaN(Number(value2))) {
    res.status(400).send({ error: "malformatted parameters" });
  }

  // assert the type of op (basically casting)
  const result = calculator(Number(value1), Number(value2), op as Operation);
  res.send({ result });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
