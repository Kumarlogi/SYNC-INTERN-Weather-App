import React, { useState } from 'react';
import './WeatherApp.css';
import './App.css';
import { Card, CardBody, CardText } from 'react-bootstrap';
import { faCity, faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [error, setError] = useState('');

  const API_KEY = 'YOUR_OPENWEATHER_API_KEY';

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`
      );
      const data = await response.json();

      if (response.ok) {
        setWeatherData(data);
        setError('');
      } else {
        setWeatherData(null);
        setError(`Error: ${data.message}`);
      }
    } catch (err) {
      setWeatherData(null);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <Card className="weather-app">
      <h1 className="title">Weather App</h1>
      <CardBody className="search-form">
        <span className="icon">
          <FontAwesomeIcon icon={faHome} className='font-awesome-icon'/>
          <input
            type="text"
            placeholder="Enter city"
            value={city}
            className='input-text'
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </span>
        <span className="icon">
          <FontAwesomeIcon icon={faCity} className='font-awesome-icon'/>
          <input
            type="text"
            placeholder="Enter country"
            value={country}
            className='input-text'
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </span>

        <button 
            className='btn-get'
            onClick={fetchWeatherData}
        >Get Weather</button>

      </CardBody>

      {weatherData && (
        <CardText className="weather-details">
          <h2>{weatherData.name}, {weatherData.sys.country}</h2>
          <p>Temperature: {weatherData.main.temp} K</p>
          <p>Description: {weatherData.weather[0].description}</p>
        </CardText>
      )}

      {error && <p className="error-message">{error}</p>}
    </Card>
  );
};

export default Weather;
