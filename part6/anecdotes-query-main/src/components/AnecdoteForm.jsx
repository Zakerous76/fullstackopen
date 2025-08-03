import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnecdote } from "../requests";
import { anecdoteSingular, anecdotesPlural } from "../constants";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData([anecdotesPlural]);
      queryClient.setQueryData(
        [anecdotesPlural],
        anecdotes.concat(newAnecdote)
      );
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    newAnecdoteMutation.mutate(content);
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name={anecdoteSingular} />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
