import { useSelector, useDispatch } from "react-redux";
import { postAnecdoteAction, voteAction } from "./reducers/anecdoteReducer";

const App = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  const vote = (anecdote) => {
    dispatch(voteAction(anecdote));
  };
  const handleAnecdoteSubmit = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    dispatch(postAnecdoteAction(content));
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form onSubmit={handleAnecdoteSubmit}>
        <div>
          <input name="anecdote" placeholder="Write anecdote here..." />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default App;
