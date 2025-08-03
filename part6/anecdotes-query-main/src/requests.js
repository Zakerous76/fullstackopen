import axios from "axios";

const baseURL = "http://localhost:3001/anecdotes";

export const getAll = async () => {
  return (await axios.get(baseURL)).data;
};
