const Person = ({person, onClick}) => {
    return (
    <div>
        <span>{person.name} {person.number}</span>
        <button onClick={()=>onClick(person.name, person.number)}>delete</button>
    </div>
    )
}

const Persons = ({shownNames, onClick}) => shownNames.map(person => <Person key={person.name} person={person} onClick={onClick}/>)

const AddPersonForm = ({newName,handleNameInputChange, newNumber, handleNumberInputChange, addPerson}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNameInputChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberInputChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const HeaderText = ({text}) => <h2>{text}</h2>

const PersonFilter = ({filter,changeFunc}) =>  <div>filter shown with: <input value={filter} onChange={changeFunc} /></div>

const Notification = ({message, type}) => {
  if(message===null) {
    return null
  }

  const style = {
    color: type==='error' ? 'red' : 'green',
    background: 'lightgrey',
    border: 'solid',
    bordercolor: type==='error' ? 'red' : 'green',
    borderradius: 10,
    padding: 5
  }

  return (
    <div style={style}>
      {message}
    </div>
  )
}

export {Person, Persons, AddPersonForm, HeaderText, PersonFilter, Notification}