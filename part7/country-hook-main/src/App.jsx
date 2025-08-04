import React, { useState, useEffect } from "react";
import axios from "axios";

const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  const url = "https://studies.cs.helsinki.fi/restcountries/api/name";
  useEffect(() => {
    console.log("useEffect Called: ");
    const fetchCountry = async () => {
      try {
        const result = await axios.get(`${url}/${name}`);
        setCountry(result);
        setCountry((prev) => ({ ...prev, found: true }));
      } catch (error) {
        if (name) {
          setCountry({ found: false });
        }
      }
    };
    fetchCountry();
  }, [name]);
  console.log("Country: ", country);
  return country;
};

const Country = ({ country }) => {
  if (!country) {
    return null;
  }

  if (!country.found) {
    return <div>not found...</div>;
  }

  return (
    <div>
      <h3>{country.data.name.common} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div>
      <img
        src={country.data.flags.png}
        height="100"
        alt={`flag of ${country.data.name.common}`}
      />
    </div>
  );
};

const App = () => {
  const nameInput = useField("text");
  const [name, setName] = useState("");
  console.log("rerender");
  const country = useCountry(name);

  const fetch = (e) => {
    console.log("fetch called: ");
    e.preventDefault();
    setName(nameInput.value);
    console.log("setName called: ");
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  );
};

export default App;
