import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import anecdoteServices from "../services/anecdotes";

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const handleAnecdoteSubmit = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    const newNote = await anecdoteServices.createNew(content);

    dispatch(createAnecdote(newNote));
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
