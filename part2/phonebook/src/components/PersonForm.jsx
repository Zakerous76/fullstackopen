import React from "react";
import { useState } from "react";
import noteServices from "../services/notes";

const PersonForm = ({ persons, setPersons, setVisiblePersons }) => {
  const [newName, setNewName] = useState(""); // for controlling <input/>
  const [newNumber, setNewNumber] = useState("");

  const addNewName = (event) => {
    event.preventDefault();
    const newPerson = { name: newName, number: newNumber };
    const result = persons.find(
      (element) => element.name.toLowerCase() === newName.toLowerCase()
    );
    console.log("result:", result);
    if (!result) {
      noteServices.create(newPerson).then(() => {
        noteServices
          .getAll()
          .then((newPersons) => {
            setPersons(newPersons);
            setVisiblePersons(newPersons);
          })
          .catch((err) => {
            alret(`Couldn't add the entry. \nSome error occured: ${err}`);
          });
      });

      setNewName("");
    } else {
      const answer = window.confirm(
        `${newName} is already added to the phonebook. \nWould you like to update it?`
      );
      if (answer) {
        noteServices.update(result.id, newPerson).then(() => {
          const newVisiblePersons = persons.map((oldPerson) =>
            oldPerson.id === result.id ? newPerson : oldPerson
          );
          setVisiblePersons(newVisiblePersons);
        });
      }
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
    </div>
  );
};

export default PersonForm;
