import { useState } from "react";

const Numbers = ({ persons }) => {
  return (
    <div>
      {persons.map((entry) => {
        return <p key={entry.name}>{entry.name}</p>;
      })}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState(""); // for controlling <input/>

  const addNewName = (event) => {
    event.preventDefault();
    const newPerson = { name: newName };
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

  const handleSetNewName = (event) => {
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewName}>
        <div>
          name: <input value={newName} onChange={handleSetNewName} />
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
