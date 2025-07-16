import { useState } from "react";

const Statistics = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
      <p>
        {props.valText1}: {props.val1}
      </p>
      <p>
        {props.valText2}: {props.val2}
      </p>
      <p>
        {props.valText3}: {props.val3}
      </p>
    </div>
  );
};

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
        <Statistics
          title="Statistics"
          valText1="Good"
          valText2="Neutral"
          valText3="Bad"
          val1={good}
          val2={neutral}
          val3={bad}
        />
        <Statistics
          title="More Statistics"
          valText1="All"
          valText2="Average"
          valText3="Positive"
          val1={all}
          val2={avg}
          val3={pos}
        />
      </div>
    </div>
  );
};

export default App;
