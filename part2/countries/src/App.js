import {useState, useEffect} from 'react'
import SearchBar from './components/SearchBar.js'
import Countries from './components/Countries.js'
import getCityWeather from './services/weatherService'
import getCountryData from './services/countryService'

const App = () => {
  const [searchText, setSearchText] = useState('')
  const [countries, setCountries] = useState([])
  const [weather, setWeather] = useState({})
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [shownCountries, setShownCountries] = useState(countries)

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

  const filterByText = (country, text) => {
    return country.name.common.toLowerCase().includes(text)
  }

  const filterByTextAndSort = (countries, text) => {
    return countries.filter((country)=>filterByText(country, text)).sort((a,b)=>a.name.common.localeCompare(b.name.common))
  }

  const handleSearchChange = (event) => {
    setSearchText(event.target.value)
    const filteredCountries = filterByTextAndSort(countries, event.target.value)
    setShownCountries(filteredCountries)
    if(filteredCountries.length === 1) {
      setSelectedCountry(filteredCountries[0])
    } else {
      setSelectedCountry(null)
    }
  }

  return (
    <div>
      <SearchBar searchText={searchText} handleSearchChange={handleSearchChange}/>
      <Countries countries={shownCountries} selectedCountry={selectedCountry} weather={weather} onClick={setSelectedCountry} />
    </div>

  );
}

export default App;
