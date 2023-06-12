import axios from 'axios'

const baseUrl = '/api/persons'

const getAll = () => {
  const request =  axios.get(`${baseUrl}`)
  return request.then(response => response.data)
}

const createPerson = (newPerson) => {
  const request = axios.post(`${baseUrl}`, newPerson)
  return request.then(response => response.data)
}

const deletePerson = (personId) => {
  const request = axios.delete(`${baseUrl}/${personId}`)
  return request.then(response => response.data)
}

const updatePerson = (person) => {
  const request = axios.put(`${baseUrl}/${person.id}`, person)
  return request.then(response => response.data)
}

const exportable = { getAll, createPerson, deletePerson, updatePerson }

export default exportable