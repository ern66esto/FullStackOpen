import { useState } from 'react';
import Filter from './components/Filter';
import Add from './components/Add';

const App = () => {
  const [persons, setPersons] = useState([
    { name:'Arto Hellas', number:'040-1231567', id:1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);

  const [findName, setFindName] = useState('');
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const handleFindChange = (event) => {
    setFindName(event.target.value);
  }

  const filteredData = persons.filter(person => person.name.toLowerCase().includes(findName.toLowerCase()));

  const addPerson = (event) =>{
    event.preventDefault();
      if (newName.trim().length > 0 && newNumber.trim().length > 0) {
        if (!persons.some(item => item.name === newName.trim())) {
            const newPersonObject = {name: newName.trim(), number: newNumber.trim(), id: String(persons[persons.length - 1].id + 1)};
            setPersons(persons.concat(newPersonObject));
        }
        else{
          alert(`${newName.trim()} is already added to phonebook`);
        }
          setNewName('');
          setNewNumber('');  
      }
  }

  const handleNameChange = (event) =>{
    setNewName(event.target.value);
  }
  const handleNumberChange = (event) =>{
    setNewNumber(event.target.value);
  }
  
  const AddComponentProps = {addPerson, newName, handleNameChange, newNumber, handleNumberChange, persons}
  
    return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFindChange={handleFindChange} findName={findName} filteredData={filteredData}/>
      <Add {...AddComponentProps}/>
      {/* <div>
        debug: {newName}  
      </div>  */}
    </div>
  )
}

export default App
