import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/filter'
import Personform from './components/personform'
import Persons from './components/persons'
import personsync from './services/personsync'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    personsync
      .getAll()
        .then(initialPersons => {
          setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }

    if (persons.map(person => person.name).includes(newName)) {
      //alert(`${newName} is already added to phonebook`);
      const existingPerson = persons.find(person => person.name === newName)
      console.log(existingPerson.name)
      if (window.confirm(`${newName} is already added to Phonebook, replace the old number with the new one?`)){
        personsync.update(existingPerson.id, personObject)
          .then(updatedPerson => {
            setPersons(persons.map(person =>
              person.id !== existingPerson.id ? person : updatedPerson
            ))
          })
      }

    } else {
        personsync
          .create(personObject)
            .then(returnedPerson => {
              setPersons(persons.concat(returnedPerson))
              setNewName('')
              setNewNumber('')
            })
      }
  }

  const deletePerson = (id) => {
    const person = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      personsync.deletee(id)
      .then(setPersons(persons.filter( person => person.id != id)))
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPersons = persons.filter(person =>
    person.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchTerm={searchTerm} handleSearchChange={handleSearchChange}/>
      <h2>Add a new person</h2>
      <Personform 
        newNumber={newNumber}
        newName={newName}
        addPerson={addPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <ul>
        <Persons persons={filteredPersons} deletePerson={deletePerson}/>
      </ul>
      
    </div>
  )

}

export default App