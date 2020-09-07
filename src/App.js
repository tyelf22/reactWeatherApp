import React, { useState } from 'react';
import './App.css';

import Forecast from './components/Forecast'

const api = {
  key: '0394043a3c54349ec65bfba6c892236b',
  base: 'https://api.openweathermap.org/data/2.5/'
}

function App() {
  const [query, setQuery] = useState('')
  const [degType, setDegType] = useState('imperial')
  const [weather, setWeather] = useState({})
  const [forecast, setForecast] = useState({})
  const [daily, setDaily] = useState({})

 

  const apiFetch = () => {
    fetch(`${api.base}weather?q=${query}&units=${degType}&APPID=${api.key}`)
    .then(res => res.json())
    .then(result => {
      setWeather(result)
      console.log(result)
    })
  }


  const apiFetchForecast = () => {
    fetch(`${api.base}forecast?q=${query}&units=${degType}&APPID=${api.key}`)
    .then(res => res.json())
    .then(result => {
      setForecast(result)
      console.log(result)
      setDaily(result.list.filter(reading => reading.dt_txt.includes("00:00:00")))
    })
  }

  const search = evt => {
    if(evt.key === "Enter"){
      apiFetch()
      apiFetchForecast()
    }
  }

  const getSymbol = () => {
    if(degType === 'imperial'){
      return "°F"
    }else if(degType === 'metric'){
      return "°C"
    }
  }  
  console.log(daily)

  return (
    <div className="app">
      <main>
        <div className="search-box">
          <input 
          type="text"
          className="search-bar"
          placeholder="Search..."
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
          />
        </div>
          <div className="toggle">
            <button className={degType === "imperial" ? 'button-clicked': 'button'} onClick={() => {setDegType('imperial'); apiFetch(); apiFetchForecast();}}>Fahrenheit</button>
            <button className={degType === "metric" ? 'button-clicked': 'button'} onClick={() => {setDegType('metric'); apiFetch(); apiFetchForecast();}}>Celsius</button>
          </div>
        {(typeof weather.main != "undefined" && typeof forecast.list != "undefined") ? ( 
        <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.main.temp)}
              {getSymbol()}<br/>
              {weather.weather[0].main}
            </div>
            <div className="weather">
              5-Day Forecast
            </div>
          </div>
          {(daily.length > 1) ? (
          <Forecast daily={daily} forecast={forecast} getSymbol={getSymbol}/>
          ) : (' ')}
        </div>
            ) : (' ')}
      </main>
    </div>
  );
}

export default App;
