import React, { useEffect, useState } from 'react';
import Filter from './components/Filter';
import Notification from './components/Notification';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchName, setSerachName] = useState('');
  const [message, setMessage] = useState(null);

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
      });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  }, [message]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const personsNames = persons.map(person => person.name);
    const message = `${newName} is already added to phonebook, replace the old number with a new one?`;
    const newPersonObject = {
      'name': newName,
      'number': newNumber,
    };
    if (personsNames.includes(newName) && window.confirm(message)) {
      const newObjectId = persons[personsNames.indexOf(newName)]['id'];
      personService
        .update(newObjectId, newPersonObject)
        .then((returnedPerson) => {
          setPersons(persons.map(persons => persons.id !== newObjectId ? persons : returnedPerson));
          setMessage(`Updated ${newName}`);
        })
        .catch(error => {
          setMessage(`Information of ${newName} has already been removed from server`);
        });

    } else {
      personService.create(newPersonObject).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        setNewName('');
        setNewNumber('');
        setMessage(`Added ${newName}`);
      });
    }
  };

  const handlChangeName = e => setNewName(e.target.value);
  const handlChangeNumber = e => setNewNumber(e.target.value);
  const handleSearchName = e => setSerachName(e.target.value);
  const handleDeletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService.remove(id).then((response) => {
        const updatedPersons = persons.filter((person) => person.id !== id);
        setPersons(updatedPersons);
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter searchName={searchName} setSerachName={handleSearchName} />
      <h3>Add a new</h3>
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        setNewName={handlChangeName}
        newNumber={newNumber}
        setNewNumber={handlChangeNumber}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} searchName={searchName} handleDeletePerson={handleDeletePerson} />
    </div>
  );

};

export default App;