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
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);

  const [visiblePersons, setVisiblePersons] = useState(persons);

  const [newName, setNewName] = useState(""); // for controlling <input/>
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

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
    <div>
      <h2>Phonebook</h2>
      <div id="searchSection">
        <label htmlFor="searchBox">Filter shown with: </label>
        <input
          type="text"
          id="searchBox"
          placeholder="Enter name..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <h2>Add a new entry</h2>
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
            placeholder="12-12-1234567"
            // maxLength={10}
            // pattern="[0-9]{3} [0-9]{3} [0-9]{2} [0-9]{2}"
            value={newNumber}
            onChange={handleNewNumber}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Numbers persons={visiblePersons} />
    </div>
  );
};

export default App;
