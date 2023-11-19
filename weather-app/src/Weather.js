import React, { useState } from 'react'
import axios from 'axios';

const Weather = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState('');
    const [city, setCity] = useState('');

    const API_KEY = 'fc6867746f2948bf99a372d90aa6dd20';

    const fetchWeatherData = async () => {
        try {
            const response = await axios.get(
              `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
            );
            setWeatherData(response.data);
            setError('');
            } catch (err) {
                setWeatherData(null);
                setError('City not found. Please try again.');
            }
    };
  return (
    <div>
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={fetchWeatherData}>Get Weather</button>

      {weatherData && (
        <div>
          <h2>{weatherData.name}, {weatherData.sys.country}</h2>
          <p>Temperature: {weatherData.main.temp} K</p>
          <p>Description: {weatherData.weather[0].description}</p>
        </div>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}

export default Weather;