import { useState } from "react";

const Header = ({ name }) => {
  return (
    <h1>{name}</h1>
  );
};

const Button = ({ hanldeClick, text }) => {
  return (
    <button onClick={hanldeClick}>{text}</button>
  );
};

const StatisticLine = ({ text, value, symbol }) => {
  return (
    <>
      <td>{text} </td>
      <td>{value} {symbol}</td>
    </>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const sum = good + neutral + bad;
  const average = (good - bad) / sum;
  const positive = (good / sum) * 100;

  if (sum === 0) {
    return (
      <p>No feedback given</p>
    );
  }

  return (
    <table>
      <tbody>
        <tr>
          <StatisticLine text='good' value={good} />
        </tr>
        <tr>
          <StatisticLine text='neutral' value={neutral} />
        </tr>
        <tr>
          <StatisticLine text='bad' value={bad} />
        </tr>
        <tr>
          <StatisticLine text='all' value={sum} />
        </tr>
        <tr>
          <StatisticLine text='average' value={average} />
        </tr>
        <tr>
          <StatisticLine text='positive' value={positive} symbol='%' />
        </tr>
      </tbody>
    </table>
  );
};



const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Header name='give feedback' />
      <Button hanldeClick={() => setGood(good + 1)} text='good' />
      <Button hanldeClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button hanldeClick={() => setBad(bad + 1)} text='bad' />

      <Header name='statistics' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
