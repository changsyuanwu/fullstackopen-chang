import './App.css'
import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("")
  const [filter, setFilter] = useState("")

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

    setPersons(persons.concat(person));
    setNewName("");
    setNewNumber("")
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
      <p>filter shown with <input value={filter} onChange={handleFilterChange}/></p>
      <form onSubmit={addPerson}>
        <div>
          name: <input onChange={handleNameChange} value={newName} />
        </div>
        <div>
          number: <input onChange={handleNumberChange} value={newNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {peopleToDisplay.map((person) => (
        <p key={person.name}>{person.name} {person.number}</p>
      ))}
    </div>
  );
};

export default App
