import axios from "axios";
const baseURL = "http://localhost:3011/anecdotes";

const getAll = async () => {
  return (await axios.get(baseURL)).data;
};

export default {
  getAll,
};
