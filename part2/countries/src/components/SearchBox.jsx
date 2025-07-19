import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import countriesService from "../services/countries";

const SearchBox = ({ setSearchResult }) => {
  const [inputBoxVal, setInputBoxVal] = useState("");
  const [allCountries, setAllCountries] = useState([]);

  useEffect(() => {
    countriesService.getAll().then((res) => {
      setAllCountries(res);
    });
  }, []);

  const handleInputBoxChange = (event) => {
    const countryName = event.target.value;
    setInputBoxVal(countryName);
    const allCountriesFilter = allCountries.filter((country) => {
      return country.name.common.toLowerCase().includes(countryName);
    });
    setSearchResult(allCountriesFilter);
  };

  return (
    <div className="searchBox">
      <label htmlFor="inputBox">find countries </label>
      <input
        type="text"
        name="inputBox"
        id="inputBox"
        placeholder="Enter a country"
        onChange={handleInputBoxChange}
        value={inputBoxVal}
      />
    </div>
  );
};

export default SearchBox;
