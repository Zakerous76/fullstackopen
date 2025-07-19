import axios from "axios";
const baseURL = "https://studies.cs.helsinki.fi/restcountries/api";

const getAll = () => {
  return axios.get(`${baseURL}/all`).then((res) => res.data);
};

const getCountry = (countryName) => {
  const req = axios
    .get(`${baseURL}/name/${countryName}`)
    .then((res) => console.log(res.data.name));
};

export default { getAll, getCountry };
