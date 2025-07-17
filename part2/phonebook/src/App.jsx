import { useState } from "react";

const Numbers = ({ numbers: persons }) => {
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
    setPersons(persons.concat(newPerson));
    console.log(persons);
    setNewName("");
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
      <Numbers numbers={persons} />
    </div>
  );
};

export default App;
