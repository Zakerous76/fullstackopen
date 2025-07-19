import React, { useState } from "react";
import weatherServices from "../services/weather";

const getIconSrc = (iconId) => {
  console.log("iconId,", iconId);
  return `https://openweathermap.org/img/wn/${iconId}@2x.png`;
};

const Weather = ({ city, countryCode }) => {
  const [cityTemp, setCityTemp] = useState("");
  const [cityWeatherIconSrc, setCityWeatherIconSrc] = useState("second");
  const [cityWind, setCityWind] = useState("");

  weatherServices
    .getWeather(city, countryCode)
    .then((res) => res)
    .then((weatherData) => {
      setCityTemp((weatherData.main.temp - 273.15).toFixed(2));
      setCityWind(weatherData.wind.speed.toFixed(2));
      setCityWeatherIconSrc(getIconSrc(weatherData.weather[0].icon));
    });
  return (
    <div>
      <p>Temperature {cityTemp} Celsius</p>
      <img src={cityWeatherIconSrc} />
      <p>Wind {cityWind} m/s</p>
    </div>
  );
};

export default Weather;
