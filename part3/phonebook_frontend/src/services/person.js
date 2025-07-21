// Already a step ahead for step 8
import axios from "axios";
const baseURL = "/api/persons";

const getAll = () => {
  return axios.get(baseURL).then((res) => {
    return res.data;
  });
};

const create = (obj) => {
  return axios.post(baseURL, obj).then((res) => res.data);
};

const update = (id, obj) => {
  return axios.put(`${baseURL}/${id}`, obj).then((res) => res.data);
};

const deleteNote = (id) => {
  return axios.delete(`${baseURL}/${id}`).then((res) => console.log(res));
};

export default { getAll, create, update, deleteNote };
