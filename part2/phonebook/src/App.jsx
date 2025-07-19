import { useState } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import SearchFilter from "./components/SearchFilter";
import { useEffect } from "react";
import axios from "axios";
import noteServices from "./services/notes";

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    noteServices.getAll().then((res) => {
      setPersons(res);
      setVisiblePersons(res);
    });
  }, []);

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
