import {useState, useEffect} from 'react'
import axios from 'axios'
import SearchBar from './components/SearchBar.js'
import Countries from './components/Countries.js'
import getCityWeather from './services/weatherService'
import getCountryData from './services/countryService'

const App = () => {
  const [searchText, setSearchText] = useState('')
  const [countries, setCountries] = useState([])
  const [weather, setWeather] = useState({})
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    if(selectedCountry) {
      getCityWeather(selectedCountry)
        .then(data => setWeather(data))
      }
  }, [selectedCountry])

  useEffect(() => {
    getCountryData()
      .then(data =>setCountries(data))
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
