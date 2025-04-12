// const Add = ({addPerson, newName, handleNameChange, newNumber, handleNumberChange, persons}) => {
  const Add = (props) => {
    const {addPerson, newName, handleNameChange, newNumber, handleNumberChange, persons} = props;
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