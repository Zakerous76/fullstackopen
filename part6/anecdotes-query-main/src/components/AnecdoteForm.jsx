import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnecdote } from "../requests";
import { anecdoteSingular, anecdotesPlural } from "../constants";
import { useContext } from "react";
import NotificationContext from "../NotificationContext";

const AnecdoteForm = () => {
  const [_, notificationDispatcher] = useContext(NotificationContext);
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
    onError: (error) => {
      const actionShow = {
        type: "SHOW",
        payload: `${error.response.data.error}`,
      };
      const actionHide = {
        type: "HIDE",
      };
      notificationDispatcher(actionShow);
      setTimeout(() => {
        notificationDispatcher(actionHide);
      }, 5000);
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
