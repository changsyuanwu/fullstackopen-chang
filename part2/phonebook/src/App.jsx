import './App.css'
import { useState } from 'react'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import PersonsList from './components/PersonsList.jsx';
import { useEffect } from 'react';
import phonebookService from './services/phonebook.js';
import Notification from './components/Notification.jsx';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("")
  const [filter, setFilter] = useState("")
  const [notificationMessage, setNotificationMessage] = useState(null);

  useEffect(() => {
    phonebookService.getAll()
    .then(initialData => 
      setPersons(initialData)
    )
  }, [])

  const addPerson = (e) => {
    e.preventDefault();

    const person = {
      name: newName,
      number: newNumber,
    };

    // If the person already exists
    const existingPerson = persons.find((p) => p.name === newName);
    if (existingPerson) {
      if (window.confirm(`${person.name} is already added to the phonebook, replace the old number with a new one?`)) {
        phonebookService
          .update(existingPerson.id, person)
          .then((updatedPerson) =>
            setPersons(
              persons.map((p) =>
                p.id !== updatedPerson.id ? p : updatedPerson
              )
            )
          )
          .catch((error) => {
            setNotificationMessage({
              status: "error",
              message: `Failed to update ${person.name}, their information is no longer on the server.`,
            });
            setPersons(persons.filter(p => p.id !== existingPerson.id))
            setTimeout(() => {
              setNotificationMessage(null);
            }, 3000);
            return
          });
      }
      setNotificationMessage({
        status: "success",
        message: `Updated ${person.name}`,
      });
      setTimeout(() => {
        setNotificationMessage(null);
      }, 3000);
    }
    else {
      phonebookService.create(person)
        .then(retPerson => {
          setPersons(persons.concat(retPerson));
          setNewName("");
          setNewNumber("")
          setNotificationMessage({
            status: "success",
            message: `Added ${person.name}`,
          });
        })
        .catch(err => {
          setNotificationMessage({
            status: "error",
            message: `${err.response.data.error}`,
          });
          console.log(err.response.data.error);
        })
      setTimeout(() => {
        setNotificationMessage(null);
      }, 3000);
    }
  }

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      phonebookService.deleteById(person.id)
      .then(deletedPerson => setPersons(persons.filter(p => p.id !== deletedPerson.id)))
    }
  }
  
  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => 
    setNewNumber(e.target.value)

  const handleFilterChange = (e) => 
    setFilter(e.target.value)

  const peopleToDisplay = filter === "" ? persons : persons.filter(p => p.name.toLowerCase().includes(filter))

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notificationMessage}/>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>Add a new person</h2>
      <PersonForm addPerson={addPerson} handleNameChange={handleNameChange} newName={newName} handleNumberChange={handleNumberChange} newNumber={newNumber} />
      <h2>Numbers</h2>
      <PersonsList peopleToDisplay={peopleToDisplay} onDeletePerson={ deletePerson} />
    </div>
  );
};

export default App
