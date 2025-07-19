// Already a step ahead for step 8
import axios from "axios";
const baseURL = "http://localhost:3001/persons";

const getAll = () => {
  return axios.get(baseURL).then((res) => res.data);
};

const create = (obj) => {
  return axios.post(baseURL, obj).then((res) => res.data);
};

const update = (id, obj) => {
  return axios.put(`${baseURL}/${id}`, obj).then((res) => res.data);
};

export default { getAll, create, update };
