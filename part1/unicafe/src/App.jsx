import { useState } from "react";

const handleClick = (setState) => {
  return () => {
    setState((prev) => prev + 1);
  };
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <div>
        <h1>Give Feedback</h1>
        <div>
          <button onClick={handleClick(setGood)}>Good</button>
          <button onClick={handleClick(setNeutral)}>Neutral</button>
          <button onClick={handleClick(setBad)}>Bad</button>
        </div>
      </div>
      <div>
        <h1>Statistics</h1>
        <p>Good: {good}</p>
        <p>Neutral: {neutral}</p>
        <p>Bad: {bad}</p>
      </div>
    </div>
  );
};

export default App;
