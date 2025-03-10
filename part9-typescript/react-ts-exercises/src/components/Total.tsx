import { CoursePart } from "../types";

interface TotalProps {
  courseParts: CoursePart[]
};

const Total = (props: TotalProps) => {
  const totalExercises = props.courseParts.reduce(
    (sum, part) => sum + part.exerciseCount,
    0
  );

  return (
    <p>Total number of exercises {totalExercises}</p>
  )
};

export default Total;