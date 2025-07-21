import React from "react";
import { useState } from "react";
import personServices from "../services/person";

const PersonForm = ({
  persons,
  setPersons,
  setVisiblePersons,
  setNotification,
}) => {
  const [newName, setNewName] = useState(""); // for controlling <input/>
  const [newNumber, setNewNumber] = useState("");

  const addNewName = (event) => {
    event.preventDefault();
    const newPerson = { name: newName, number: newNumber };

    const isPersonExist = persons.find(
      (element) => element.name.toLowerCase() === newName.toLowerCase()
    );
    if (!isPersonExist) {
      personServices.create(newPerson).then(() => {
        personServices
          .getAll()
          .then((newPersons) => {
            setPersons(newPersons);
            setVisiblePersons(newPersons);
            setNotification({
              message: `Added ${newName}`,
              success: true,
            });
            setTimeout(() => {
              setNotification({
                message: null,
                success: false,
              });
            }, 5000);
          })
          .catch((err) => {
            setNotification({
              message: `Couldn't add the entry. \nSome error occured: ${err}`,
              success: false,
            });
            setTimeout(() => {
              setNotification({
                message: null,
                success: false,
              });
            }, 5000);
          });
      });

      setNewName("");
      setNewNumber("");
    }
    // person exists
    else {
      const answer = window.confirm(
        `${newName} is already added to the phonebook. \nWould you like to update it?`
      );
      if (answer) {
        personServices.update(isPersonExist.id, newPerson).then((res) => {
          const newVisiblePersons = persons.map((oldPerson) =>
            oldPerson.id === isPersonExist.id ? res : oldPerson
          );
          setVisiblePersons(newVisiblePersons);
          setPersons(newVisiblePersons);
          setNotification({
            message: `Updated ${newName}'s entry`,
            success: true,
          });
          setTimeout(() => {
            setNotification({
              message: null,
              success: false,
            });
          }, 5000);
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
