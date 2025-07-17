import { useState } from "react";

const Numbers = ({ persons }) => {
  return (
    <div>
      {persons.map((entry) => {
        return (
          <p key={entry.name}>
            {entry.name} {entry.number}
          </p>
        );
      })}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "552 555 55 55" },
  ]);
  const [newName, setNewName] = useState(""); // for controlling <input/>
  const [newNumber, setNewNumber] = useState("");

  const addNewName = (event) => {
    event.preventDefault();
    const newPerson = { name: newName, number: newNumber };
    const result = persons
      .map((x) => {
        return x.name.toLowerCase() === newName.toLowerCase();
      })
      .includes(true);

    if (!result) {
      setPersons(persons.concat(newPerson));
      setNewName("");
    } else {
      alert(`${newName} is already added to the phonebook`);
    }
  };

  const handleNewName = (event) => {
    setNewName(event.target.value);
  };

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewName}>
        <div>
          <label htmlFor="name">name: </label>
          <input
            type="text"
            id="name"
            value={newName}
            onChange={handleNewName}
          />
        </div>
        <div>
          <label htmlFor="phoneNo">number: </label>
          <input
            type="tel"
            id="phoneNo"
            placeholder="552 555 55 55"
            maxLength={10}
            pattern="[0-9]{3} [0-9]{3} [0-9]{2} [0-9]{2}"
            value={newNumber}
            onChange={handleNewNumber}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Numbers persons={persons} />
    </div>
  );
};

export default App;
