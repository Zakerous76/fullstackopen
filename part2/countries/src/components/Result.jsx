import React from "react";

const Result = ({ searchResult }) => {
  const length = searchResult.length;

  if (length > 10) {
    return (
      <div className="result">
        Too many matches. Make the filter more specific
      </div>
    );
  } else if (length === 1) {
    const country = searchResult[0];
    const name = country.name.common;
    const capital = country.capital.join(" | ");
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
        <h1>{name}</h1>
        <p>
          Capital {capital} <br />
          Area {area}{" "}
        </p>

        <h2>Languages</h2>
        <p>
          {languagesArr.map((lang) => (
            <li>{lang}</li>
          ))}
        </p>
        <img src={flagSrc} height={225} alt={flagAlt} />
      </div>
    );
  } else {
    return (
      <div className="result">
        {searchResult.map((country) => (
          <li key={country.name.common}>
            {country.name.common}
            <br />
          </li>
        ))}
      </div>
    );
  }
};

export default Result;
