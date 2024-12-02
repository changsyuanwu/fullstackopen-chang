import './App.css'
import { useState } from 'react'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import PersonsList from './components/PersonsList.jsx';
import { useEffect } from 'react';
import phonebookService from '../services/phonebook.js';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("")
  const [filter, setFilter] = useState("")

  useEffect(() => {
    phonebookService.getAll()
    .then(initialData => 
      setPersons(initialData)
    )
  }, [])

  const addPerson = (e) => {
    e.preventDefault();

    // If the person already exists
    if (persons.find((p) => p.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const person = {
      name: newName,
      number: newNumber
    };

    phonebookService.create(person)
      .then(retPerson => {
        setPersons(persons.concat(retPerson));
        setNewName("");
        setNewNumber("")
      })
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
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>Add a new person</h2>
      <PersonForm addPerson={addPerson} handleNameChange={handleNameChange} newName={newName} handleNumberChange={handleNumberChange} newNumber={newNumber} />
      <h2>Numbers</h2>
      <PersonsList peopleToDisplay={peopleToDisplay} />
    </div>
  );
};

export default App
