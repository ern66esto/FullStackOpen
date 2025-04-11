import { useState } from 'react';

const Add = ({persons, setPersons}) => {
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');

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
    return(
        <>
            <form onSubmit={addPerson} >
                <h2>add a new</h2>
                <div>
                name: <input value={newName} onChange={handleNameChange}/>
                </div>
                <div>
                number: <input value={newNumber} onChange={handleNumberChange}/>
                </div>
                <div>
                <button type='submit'>add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <ul>
                {
                    persons.map((person) => <li key={person.name}>{person.name} {person.number}</li>)
                }
            </ul>
        </>
    )
}
export default Add;