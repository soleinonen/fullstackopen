import Weather from './Weather.js'

const CountryInfo = ({country, weather}) => {
    const languageKeys = Object.keys(country.languages)
    return (
      <div>
        <h3>{country.name.common}</h3>
        <p>Capital: {country.capital[0]}</p>
        <p>Area: {country.area}</p>
        <b>Languages:</b>
        <ul>
          {languageKeys.map(key => <li key={key}> {country.languages[key]}</li>)}
        </ul>
        <div>{country.flag}</div>
        <Weather weather = {weather} capital={country.capital[0]}/>
      </div>
    )
  }

  export default CountryInfo