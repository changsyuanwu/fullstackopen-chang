import { useState } from 'react'
import './App.css'

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);

const Header = ({ text }) => (
  <h1>{text}</h1>
)

const StatisticLine = ({ text, value }) => {
  if (text === "Positive") {
    return (
      <p>
        {text} {value} %
      </p>
    );
  }
  return (
    <p>{text} {value}</p>
  )
}

const Statistics = ({ stats }) => {
  if (stats.all > 0) {
    return (
      <>
        <Header text="Statistics" />
        <StatisticLine text="Good" value={stats.good} />
        <StatisticLine text="Neutral" value={stats.neutral} />
        <StatisticLine text="Bad" value={stats.bad} />
        <StatisticLine text="All" value={stats.all} />
        <StatisticLine text="Average" value={stats.average} />
        <StatisticLine text="Positive" value={stats.positivePercent} />
      </>
    );
  }
  else {
    return <p>No feedback given</p>
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const all = good + neutral + bad

  const stats = {};
  stats.good = good;
  stats.neutral = neutral;
  stats.bad = bad;
  stats.all = all;
  stats.average = all > 0 ? good - bad / all : 0;
  stats.positivePercent = all > 0 ? good / all * 100 : 0;

  

  return (
    <div>
      <Header text="Give Feedback" />
      <Button text="Good" handleClick={() => setGood(good + 1)} />
      <Button text="Neutral" handleClick={() => setNeutral(neutral + 1)} />
      <Button text="Bad" handleClick={() => setBad(bad + 1)} />
      <Statistics stats={stats} />
    </div>
  );
};


export default App
