import './App.css'

const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  );
}

const Content = (props) => {
  console.log(props)
  return (
    <>
      <Part
        title={props.parts[0].name}
        numExercises={props.parts[0].exercises}
      />
      <Part
        title={props.parts[1].name}
        numExercises={props.parts[1].exercises}
      />
      <Part
        title={props.parts[2].name}
        numExercises={props.parts[2].exercises}
      />
    </>
  );
}

const Part = (props) => {
  console.log("hiii")
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
  const course = "Half Stack application development";
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]
  const part1 = {
    name: "Fundamentals of React",
    exercises: 10,
  };
  const part2 = {
    name: "Using props to pass data",
    exercises: 7,
  };
  const part3 = {
    name: "State of a component",
    exercises: 14,
  };

  return (
    <div>
      <Header course={course} />
      <Content parts={[part1, part2, part3]} />
      <Total
        sumExercises={part1.exercises + part2.exercises + part3.exercises}
      />
    </div>
  );
}

export default App
