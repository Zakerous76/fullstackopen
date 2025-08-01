import { useEffect } from "react";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import { setAnecdotes } from "./reducers/anecdoteReducer";
import anecdoteServices from "./services/anecdotes";
import { useDispatch, useSelector } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(({ anecdotes }) => anecdotes);

  useEffect(() => {
    anecdoteServices.getAll().then((data) => {
      dispatch(setAnecdotes(data));
      console.log("anecdotes from ehre: ", anecdotes);
    });
  }, []);

  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList />
      <h2>create new</h2>
      <AnecdoteForm />
    </div>
  );
};

export default App;
