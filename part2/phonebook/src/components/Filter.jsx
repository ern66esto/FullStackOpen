const Filter = ({handleFindChange, findName, filteredData}) => {
    //console.log('findname: ', findName);
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