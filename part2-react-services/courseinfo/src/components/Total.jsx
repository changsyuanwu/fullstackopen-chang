const Total = ({ parts }) => {
  const sum = parts.reduce(
    (prev, cur) => prev + cur.exercises
    , 0)

  return (
    <p>
      <b>Number of exercises {sum}</b>
    </p>
  );
}

export default Total