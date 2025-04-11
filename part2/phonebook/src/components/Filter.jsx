import { useState } from 'react';

const Filter = (props) => {
    const [findName, setFindName] = useState('');
    const persons = props.persons;

    const handleFindChange = (event) => {
        setFindName(event.target.value);
      }

    const filteredData = persons.filter(person => person.name.toLowerCase().includes(findName.toLowerCase()));

    return (
        <>
        <div>
            filter shown with <input value={findName} onChange={handleFindChange}/>
        </div>
        <ul>
            {
                findName.length > 0 &&
                filteredData.map(person => (<li key={person.id}>{person.name}</li>))
            }
      </ul>
      </>
    )
}
export default Filter;