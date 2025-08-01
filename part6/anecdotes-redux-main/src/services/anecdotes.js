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

export default {
  getAll,
  createNew,
};
