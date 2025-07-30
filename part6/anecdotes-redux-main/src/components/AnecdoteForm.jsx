import { useDispatch } from "react-redux";
import { postAnecdoteAction } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const handleAnecdoteSubmit = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    dispatch(postAnecdoteAction(content));
  };
  return (
    <div>
      <form onSubmit={handleAnecdoteSubmit}>
        <div>
          <input name="anecdote" placeholder="Write anecdote here..." />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
