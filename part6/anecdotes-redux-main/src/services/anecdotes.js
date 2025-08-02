import axios from "axios";
const baseURL = "http://localhost:3011/anecdotes";

const getAll = async () => {
  return (await axios.get(baseURL)).data;
};

const createNew = async (content) => {
  const newAnecdote = {
    content,
    votes: 0,
  };
  const result = await axios.post(baseURL, newAnecdote);
  return result.data;
};

const incremenetVote = async (anecdote) => {
  const updatedAnecdote = { ...anecdote, vote: anecdote.vote + 1 };
  const response = await axios.put(
    `${baseURL}/${anecdote.id}`,
    updatedAnecdote
  );
  return response.data;
};

export default {
  getAll,
  createNew,
  incremenetVote,
};
