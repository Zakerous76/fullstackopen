import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAll, vote } from "./requests";
import { anecdotesPlural } from "./constants";
import { useContext } from "react";
import NotificationContext from "./NotificationContext";

const App = () => {
  const [_, notificationDispatcher] = useContext(NotificationContext);

  const result = useQuery({
    queryKey: [anecdotesPlural],
    queryFn: getAll,
    retry: 2,
    refetchOnWindowFocus: false,
  });
  const queryClient = useQueryClient();
  const voteMutation = useMutation({
    mutationFn: vote,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData([anecdotesPlural]);
      const newAnecdotes = anecdotes.map((anecdote) => {
        return anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote;
      });

      queryClient.setQueryData([anecdotesPlural], newAnecdotes);
    },
  });

  if (result.status === "pending") {
    return (
      <div>
        <h3>loading...</h3>
      </div>
    );
  }

  if (result.status === "error") {
    return <h2>anecdote service not available due to problems in server</h2>;
  }

  const anecdotes = result.data;

  const handleVote = (anecdote) => {
    voteMutation.mutate(anecdote);
    const actionShow = {
      type: "SHOW",
      payload: `anecdote '${anecdote.content}' voted`,
    };
    const actionHide = {
      type: "HIDE",
    };
    notificationDispatcher(actionShow);
    setTimeout(() => {
      notificationDispatcher(actionHide);
    }, 5000);
  };

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}{" "}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
