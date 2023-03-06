import {useState, useEffect} from 'react'
import axios from 'axios'
import SearchBar from './components/SearchBar.js'
import Countries from './components/Countries.js'

const App = () => {
  const weather_api_key = process.env.REACT_APP_API_KEY
  const [searchText, setSearchText] = useState('')
  const [countries, setCountries] = useState([])
  const [weather, setWeather] = useState({})
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    if(selectedCountry) {
      axios
      .get(`http://api.openweathermap.org/data/2.5/weather?q=${selectedCountry.capital[0]}&appid=${weather_api_key}`)
      .then(response => {
        console.log(response)
        setWeather(response.data)
      })
    }
  }, [selectedCountry])

  useEffect(() => {
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => {
      setCountries(response.data)
    })
  }, [])

  const filterFunc = (country) => {
    return country.name.common.toLowerCase().includes(searchText.toLowerCase())
  }

  const handleSearchChange = (event) => {
    event.preventDefault()
    setSearchText(event.target.value)
    const filteredCountries = countries.filter((country) => country.name.common.toLowerCase().includes(event.target.value.toLowerCase()))
    if(filteredCountries.length === 1) {
      setSelectedCountry(filteredCountries[0])
    } else {
      setSelectedCountry(null)
    }
  }

  return (
    <div>
      <SearchBar searchText={searchText} handleSearchChange={handleSearchChange}/>
      <Countries countries={countries.filter(filterFunc).sort((a,b)=>a.name.common.localeCompare(b.name.common))} selectedCountry={selectedCountry} weather={weather} onClick={setSelectedCountry} />
    </div>

  );
}

export default App;
