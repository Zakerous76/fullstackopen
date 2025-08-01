import { useSelector, useDispatch } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";
const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) =>
    anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(filter.toLowerCase())
    )
  );

  const dispatch = useDispatch();
  const handleVote = (anecdoteId) => {
    console.log("vote: ", anecdoteId);
    dispatch(vote(anecdoteId));
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
