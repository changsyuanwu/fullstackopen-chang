import { useState } from 'react'
import './App.css'

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);

const Header = ({ text }) => (
  <h1>{text}</h1>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const all = good + neutral + bad;
  const average = all > 0 ? good - bad / all : 0;
  const positivePercent = all > 0 ? good / all * 100 : 0;

  return (
    <div>
      <Header text="Give Feedback" />
      <Button text="Good" handleClick={() => setGood(good + 1)} />
      <Button text="Neutral" handleClick={() => setNeutral(neutral + 1)} />
      <Button text="Bad" handleClick={() => setBad(bad + 1)} />
      <Header text="Statistics" />
      <p>Good {good}</p>
      <p>Neutral {neutral}</p>
      <p>Bad {bad}</p>
      <p>All {all}</p>
      <p>Average {average}</p>
      <p>Positive {positivePercent}%</p>
    </div>
  );
};


export default App
