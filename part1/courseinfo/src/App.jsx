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
  return (
    <>
      <p>
        {props.title} {props.numExercises}
      </p>
    </>
  );
}

const Total = (props) => {
  const sumExercises =
    props.parts[0].exercises +
    props.parts[1].exercises +
    props.parts[2].exercises;
  return (
    <>
      <p>Number of exercises {sumExercises}</p>
    </>
  );
}

const App = () => {
  const course = "Half Stack application development";
  const parts = [
    {
      name: "Fundamentals of React",
      exercises: 10,
    },
    {
      name: "Using props to pass data",
      exercises: 7,
    },
    {
      name: "State of a component",
      exercises: 14,
    },
  ];

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
}

export default App
