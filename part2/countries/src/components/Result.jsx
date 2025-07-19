import React from "react";
import { useState } from "react";
import Weather from "./Weather";

const Result = ({ searchResult, setSearchResult }) => {
  const length = searchResult.length;

  const handleCountryClick = (param) => () => {
    const filteredSearchResult = searchResult.find((country) => {
      return country.name.common.toLowerCase() === param.toLowerCase();
    });
    setSearchResult([].concat(filteredSearchResult));
  };

  // more than 10 countries

  if (length > 10) {
    return (
      <div className="result">
        Too many matches. Make the filter more specific
      </div>
    );
  }
  // 1 country
  else if (length === 1) {
    const country = searchResult[0];

    const countryName = country.name.common;
    const countryCode = country.cca2;
    const capital = country.capital[0];
    const area = country.area;
    const languagesObject = country.languages;
    let languagesArr = [];
    for (const key in languagesObject) {
      languagesArr.push(languagesObject[key]);
    }
    const flagSrc = country.flags.svg;
    const flagAlt = country.flags.alt;

    return (
      <div className="result">
        <h1>{countryName}</h1>
        <p>
          Capital {capital} <br />
          Area {area}{" "}
        </p>

        <h2>Languages</h2>
        <p>
          {languagesArr.map((lang) => (
            <li key={lang}>{lang}</li>
          ))}
        </p>
        <img src={flagSrc} height={225} alt={flagAlt} />

        <h2>Weather in {capital}</h2>
        <Weather city={capital} countryCode={countryCode} />
      </div>
    );
  }
  // 1 < country < 10
  else {
    return (
      <div className="result">
        {searchResult.map((country) => (
          <li key={country.name.common}>
            {country.name.common}{" "}
            <button
              type="text"
              onClick={handleCountryClick(country.name.common)}
            >
              Show
            </button>
            <br />
          </li>
        ))}
      </div>
    );
  }
};

export default Result;
