import CountryListItem from './CountryListItem.js'
import CountryInfo from './CountryInfo.js'

const Countries = ({countries, selectedCountry, weather, onClick}) => {
    if(selectedCountry) {
      return <CountryInfo country={selectedCountry} weather={weather}/>
    }
    if(countries.length >=11) {
      return <div>Too many matches, specify another filter</div>
    } else if(countries.length<1) {
      return <div>No matches</div>
    }
    return countries.map(country => <CountryListItem key={country.name.official} country={country} onClick={onClick}/>)
  }

export default Countries