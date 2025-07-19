import { useState } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import SearchFilter from "./components/SearchFilter";
import { useEffect } from "react";
import noteServices from "./services/person";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [notification, setNotification] = useState({
    message: null,
    success: false,
  });

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
      <Notification notification={notification} />
      <SearchFilter persons={persons} setVisiblePersons={setVisiblePersons} />
      <h3>Add a new entry</h3>
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        setVisiblePersons={setVisiblePersons}
        setNotification={setNotification}
      />
      <h3>Numbers</h3>
      <Persons
        visiblePersons={visiblePersons}
        setVisiblePersons={setVisiblePersons}
        setNotification={setNotification}
        setPersons={setPersons}
      />
    </div>
  );
};

export default App;
