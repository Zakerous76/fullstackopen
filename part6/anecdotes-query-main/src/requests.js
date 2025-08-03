import axios from "axios";

const baseURL = "http://localhost:3001/anecdotes";

export const getAll = async () => {
  return (await axios.get(baseURL)).data;
};

export const createAnecdote = async (content) => {
  const anecdote = {
    content,
    votes: 0,
  };
  return (await axios.post(baseURL, anecdote)).data;
};
