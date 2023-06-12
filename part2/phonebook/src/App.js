import { useState, useEffect } from 'react'
import { HeaderText, PersonFilter, AddPersonForm, Persons, Notification } from './components/components'
import personService from './services/personService'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notificationText, setNotificationText] = useState(null)
  const [notificationType, setNotificationType] = useState(null)

  useEffect(() => {
    personService.getAll()
      .then(data => setPersons(data))
  }, [])

  const handleNameInputChange = (event) => setNewName(event.target.value)

  const handleNumberInputChange = (event) => setNewNumber(event.target.value)

  const nameFilterFunc = (person) => person.name.toLowerCase().includes(filter.toLowerCase())

  const handleFilterInputChange = (event) => setFilter(event.target.value)

  const notify = (message, type='info') => {
    setNotificationType(type)
    setNotificationText(message)
    setTimeout(() => {
      setNotificationText(null)
      setNotificationType(null)
    }, 2000)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObj = {
      name: newName,
      number: newNumber
    }
    if(persons.map(person => person.name).includes(newName)) {
      const updateConfirmation = window.confirm(`${newName} is already in the phonebook, replace the old number with a new one?`)
      if (updateConfirmation) {
        personObj.id = persons.find(person => person.name===newName).id
        personService.updatePerson(personObj).then(() => {
          setPersons(persons.filter(person => person.id!==personObj.id).concat(personObj))
          notify(`Number of ${personObj.name} has been updated.`)
        })
          .catch(() => {
            notify(`Person ${personObj.name} is already removed from server.`, 'error')
            setTimeout(() => {
              personService.getAll()
                .then(data => setPersons(data))
            }, 2000)
          })
      }
      return
    }
    personService.createPerson(personObj).then(retPerson => {
      setPersons(persons.concat(retPerson))
      setNewName('')
      setNewNumber('')
      notify(`Added person ${personObj.name}.`)
    })
      .catch(error => {
        notify(error.response.data.error, 'error')
      })
  }

  const deletePerson = (name) => {
    const deleteConfirmation = window.confirm(`Delete ${name} from database?`)
    const personId = persons.find(person => person.name===name).id
    if(deleteConfirmation) {
      personService.deletePerson(personId).then(() => {
        setPersons(persons.filter(person => person.id!==personId))
        notify(`Deleted ${name} from database.`)
      })
    }
  }

  return (
    <div>
      <HeaderText text="Phonebook" />
      <Notification message={notificationText} type={notificationType}/>
      <PersonFilter filter={filter} changeFunc={handleFilterInputChange}/>
      <HeaderText text ="Add new contact" />
      <AddPersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameInputChange={handleNameInputChange}
        handleNumberInputChange={handleNumberInputChange}
        addPerson={addPerson} />
      <HeaderText text="Numbers" />
      <Persons shownNames={persons.filter(nameFilterFunc)} onClick={deletePerson} />
    </div>
  )
}

export default App