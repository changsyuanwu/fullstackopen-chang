import './App.css'

const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  );
}

const Content = (props) => {
  return (
    <>
      <p>
        {props.title} {props.numExercises}
      </p>
    </>
  );
}

const Total = (props) => {
  return (
    <>
      <p>Number of exercises {props.sumExercises}</p>
    </>
  );
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content title={part1} numExercises={exercises1} />
      <Content title={part2} numExercises={exercises2} />
      <Content title={part3} numExercises={exercises3} />
      <Total sumExercises={exercises1 + exercises2 + exercises3} />
    </div>
  );
}

export default App
