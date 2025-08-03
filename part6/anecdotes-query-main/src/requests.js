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

export const vote = async (anecdote) => {
  try {
    const anecdoteId = anecdote.id;
    const newAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
    const result = await axios.put(`${baseURL}/${anecdoteId}`, newAnecdote);
    return result.data;
  } catch (error) {
    console.log("error from server:", error);
  }
};
