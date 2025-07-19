import axios from "axios";

// const baseURL = `https://api.openweathermap.org/data/2.5/weather?q=${London}`
const weatherBaseURL = `https://api.openweathermap.org/data/2.5/weather`;
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
// const geocoderBaseURL = `http://api.openweathermap.org/geo/1.0/direct`;

const apiKey = import.meta.env.VITE_SOME_KEY;
console.log("apiKey", apiKey);

// const geocoder = (cityName, countryCode) => {
//   const geocoderURL = `${geocoderBaseURL}?q=${cityName},,${countryCode}$limit=${1}&appid=${apiKey}`;
//   axios.get(geocoderURL);
// };

const getWeather = (cityName, countryCode) => {
  return axios
    .get(`${weatherBaseURL}?q=${cityName}&appid=${apiKey}`)
    .then((res) => {
      console.log("res:", res.data);
      return res.data;
    });
};

export default { getWeather };
