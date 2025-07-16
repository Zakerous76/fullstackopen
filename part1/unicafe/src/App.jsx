import { useState } from "react";

const Button = (props) => {
  return <button onClick={props.onClick}>{props.text}</button>;
};

const StatisticsLine = ({ valText, val }) => {
  return (
    <tr>
      <td>{valText}</td>
      <td>{val}</td>
    </tr>
  );
};

const Statistics = (props) => {
  if (props.val1 === 0 && props.val2 === 0 && props.val3 === 0) {
    return (
      <div>
        <h1>{props.title}</h1>
        <p>No statistics have been given yet</p>
      </div>
    );
  }

  return (
    <table>
      <tr>
        <th>{props.title}</th>
      </tr>
      <StatisticsLine valText={prsops.valText1} val={props.val1} />
      <StatisticsLine valText={props.valText2} val={props.val2} />
      <StatisticsLine valText={props.valText3} val={props.val3} />
    </table>
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
          <Button onClick={handleGood} text="Good" />
          <Button onClick={handleNeutral} text="Neutral" />
          <Button onClick={handleBad} text="Bad" />
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
