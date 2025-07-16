import { useState } from "react";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const [all, setAll] = useState(0);
  const [avg, setAvg] = useState(0);
  const [pos, setPos] = useState(0);

  const handleGood = () => {
    const newGood = good + 1;
    const newAll = newGood + neutral + bad;
    const newAvg = (newGood - bad) / newAll;
    const newPos = newGood / newAll;

    setGood(newGood);
    setAll(newAll);
    setAvg(newAvg);
    setPos(newPos);
  };

  const handleNeutral = () => {
    const newNeutral = neutral + 1;
    const newAll = good + newNeutral + bad;
    const newAvg = (good - bad) / newAll;
    const newPos = (good / newAll) * 100;

    setNeutral(newNeutral);
    setAll(newAll);
    setAvg(newAvg);
    setPos(newPos);
  };

  const handleBad = () => {
    const newBad = bad + 1;
    const newAll = good + neutral + newBad;
    const newAvg = (good - newBad) / newAll;
    const newPos = (good / newAll) * 100;

    setBad(newBad);
    setAll(newAll);
    setAvg(newAvg);
    setPos(newPos);
  };

  return (
    <div>
      <div>
        <h1>Give Feedback</h1>
        <div>
          <button onClick={handleGood}>Good</button>
          <button onClick={handleNeutral}>Neutral</button>
          <button onClick={handleBad}>Bad</button>
        </div>
      </div>
      <div>
        <h1>Statistics</h1>
        <p>Good: {good}</p>
        <p>Neutral: {neutral}</p>
        <p>Bad: {bad}</p>

        <h2>More Statistics</h2>
        <p>All: {all}</p>
        <p>Average: {avg}</p>
        <p>Positive: {pos}</p>
      </div>
    </div>
  );
};

export default App;
