import React from "react";
import { useState } from "react";

const SearchFilter = ({ persons, setVisiblePersons }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);

    const newVisiblePersons = persons.filter((person) => {
      return person.name.toLowerCase().includes(newSearchTerm.toLowerCase());
    });
    console.log(newVisiblePersons);
    setVisiblePersons(newVisiblePersons);
  };

  return (
    <div id="searchFilter">
      <label htmlFor="searchBox">Filter shown with: </label>
      <input
        type="text"
        id="searchBox"
        placeholder="Enter name..."
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchFilter;
