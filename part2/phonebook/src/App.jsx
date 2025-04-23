import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import Add from './components/Add';
import personService from './services/persons';
import Notification from './components/Notification';


const App = () => {
  const [persons, setPersons] = useState([]);
  useEffect(() => {
    personService.getAll()
    .then(initialPersons => {setPersons(initialPersons);})
  },[]);
  
  const [findName, setFindName] = useState('');
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [messageText, setMessageText] = useState({message: '', styleClassName:''});

  const handleFindChange = (event) => {
    setFindName(event.target.value);
  }

  const filteredData = persons.filter(person => person.name.toLowerCase().includes(findName.toLowerCase()));

  const addPerson = (event) =>{
    event.preventDefault();
      if (newName.trim().length > 0 && newNumber.trim().length > 0) {
        if (!persons.some(item => item.name === newName.trim())) {
            const newPersonObject = {name: newName.trim(), number: newNumber.trim()};
            personService.create(newPersonObject).then((response) => {
              sendMessage(`Added ${response.name}`, "success");
              setPersons(persons.concat(response));
            })
            .catch(error => {
              sendMessage(error.message, "failed");
            });
        }
        else{
          const person = persons.find(p => p.name === newName);
          if (newNumber.trim() === person.number.trim()) {
            alert(`${newName.trim()} is already added to phonebook`);
          }
          else{
            if (window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)) {
              const updatePersonObject = {name: person.name.trim(), number: newNumber.trim(), id: person.id};
              personService.update(person.id, updatePersonObject).then((response) => {
                sendMessage(`Modified ${response.name}`, "success");
                setPersons(persons.map(p => p.id !== person.id ? p : response));
              })
              .catch(error => {
                sendMessage(error.message, "failed");
                console.log('Error updating a person: ', error);
              });
            } 
          }
          
        }
          setNewName('');
          setNewNumber('');  
      }
  }

  const sendMessage = (message, styleClass) => {
    const sendMessage = {message: message, styleClassName: styleClass};
    setMessageText(sendMessage);
    setTimeout(() => {setMessageText({message: '', styleClassName:''})},3000);
  }

  const handleNameChange = (event) =>{
    setNewName(event.target.value);
  }
  const handleNumberChange = (event) =>{
    setNewNumber(event.target.value);
  }

  const handleRemovePerson = (person) => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService.remove(person.id).then((response) => {
        if (response === person.id) {
          setPersons(persons.filter(p => p.id !== person.id));  
        }
      }).catch(
        error => {
          console.log('Error deleting', error);
          sendMessage(`Information of ${person.name} has already bee removed from server`, "failed");
          setPersons(persons.filter(p => p.id !== person.id));
        }
      );
    }
  }
  
  const AddComponentProps = {addPerson, newName, handleNameChange, newNumber, handleNumberChange, persons, handleRemovePerson}
  
    return (
    <div>
      <h2>Phonebook</h2>
      <Notification messageText={messageText}/>
      <Filter handleFindChange={handleFindChange} findName={findName} filteredData={filteredData}/>
      <Add {...AddComponentProps}/>
      {/* <div>
        debug: {newName}  
      </div>  */}
    </div>
  )
}

export default App
