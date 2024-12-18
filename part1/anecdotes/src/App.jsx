import { useState } from 'react'
import './App.css'

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const getRandomAnecdote = () => {
    return Math.floor(Math.random() * anecdotes.length);
  };

  const [selected, setSelected] = useState(getRandomAnecdote());

  const selectRandomAnecdote = () => {
    let randomId = getRandomAnecdote();
    while (randomId === selected)
      randomId = getRandomAnecdote();
    console.log(randomId)
    setSelected(randomId)
  }

  const initialPointsObject = () => {
    const emptyPoints = {};
    anecdotes.forEach((a, idx) => {
      emptyPoints[idx] = 0;
    });
    return emptyPoints;
  };

  
  
  const [points, setPoints] = useState(initialPointsObject());
  
  const [mostVotedId, setMostVotedId] = useState(0)

  const curSelectedAnecdotePoints = Object.prototype.hasOwnProperty.call(points, selected) ? points[selected] : 0;

  const getMostVotedAnecdoteId = (points) => {
    let mostVotedId = 0;
    for (const [id, votes] of Object.entries(points)) {
      if (!Object.prototype.hasOwnProperty.call(points, mostVotedId) || votes >= points[mostVotedId])
        mostVotedId = id;
    }
    return mostVotedId;
  };

  const voteForCurrentAnecdote = () => {
    const copy = { ...points } 
    copy[selected] = curSelectedAnecdotePoints + 1
    setPoints(copy);
    setMostVotedId(getMostVotedAnecdoteId(copy))
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {curSelectedAnecdotePoints} votes</p>
      <Button handleClick={() => voteForCurrentAnecdote()} text="Vote" />
      <Button handleClick={() => selectRandomAnecdote()} text="Next anecdote" />
      <h1>Anecdote with the most votes</h1>
      <p>{anecdotes[mostVotedId]}</p>
      <p>has {points[mostVotedId]} votes</p>
    </div>
  );
};

export default App
