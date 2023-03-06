import axios from 'axios'

const weather_api_key = process.env.REACT_APP_API_KEY

const getCityWeather = (selectedCountry) => {
    const request = axios
        .get(`http://api.openweathermap.org/data/2.5/weather?q=${selectedCountry.capital[0]}&appid=${weather_api_key}`)
    return request.then(response =>response.data)
}

export default getCityWeather