import { useState } from "react";

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

  let randNum = Math.floor(Math.random() * anecdotes.length);

  const [selected, setSelected] = useState(randNum);
  const [votes, setVotes] = useState(new Uint8Array(anecdotes.length));

  const handleNextAnecdote = () => {
    let randNum = Math.floor(Math.random() * anecdotes.length);
    console.log(randNum);
    setSelected(randNum);
  };

  const handleVote = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
  };

  const returnMaxIndex = () => {
    let maxIndex = 0;
    let element = votes[maxIndex];
    for (let index = 0; index < votes.length; index++) {
      if (votes[index] > votes[maxIndex]) {
        maxIndex = index;
      }
    }
    return maxIndex;
  };

  return (
    <div>
      <div>
        <h2>Anecdote of the Day</h2>
        <p>{anecdotes[selected]}</p>
        <p>This has {votes[selected]}</p>
        <button onClick={handleNextAnecdote}>Next Anecdote</button>
        <button onClick={handleVote}>Vote</button>
      </div>
      <div>
        <h2>Anecdote with the most number of Votes</h2>
        <p>{anecdotes[returnMaxIndex()]}</p>
        <p>This has {votes[returnMaxIndex()]}</p>
      </div>
    </div>
  );
};

export default App;
