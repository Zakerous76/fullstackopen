import { useState } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import SearchFilter from "./components/SearchFilter";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [visiblePersons, setVisiblePersons] = useState(persons);
  // A super wacky solution, but it works
  return (
    <div>
      <h2>Phonebook</h2>
      <SearchFilter persons={persons} setVisiblePersons={setVisiblePersons} />
      <h3>Add a new entry</h3>
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        setVisiblePersons={setVisiblePersons}
      />
      <h3>Numbers</h3>
      <Persons persons={visiblePersons} />
    </div>
  );
};

export default App;
