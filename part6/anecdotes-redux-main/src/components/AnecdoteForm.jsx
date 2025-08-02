import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const handleAnecdoteSubmit = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    dispatch(createAnecdote(content));
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
