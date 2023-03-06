function kelvinToCelsius(kelvin){
    return kelvin-273.15
  }

const Weather = ({weather, capital}) => {
    if(weather.main===undefined){
      return
    }
    return(
    <div>
      <h3>Weather in {capital}</h3>
      <div>temperature {kelvinToCelsius(weather.main.temp).toFixed(2)} Celsius</div>
      <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}/>
      <div>wind {weather.wind.speed.toFixed(2)} m/s</div>
    </div>
    )
  }

export default Weather