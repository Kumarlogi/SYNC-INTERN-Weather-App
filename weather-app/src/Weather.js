import React, { useState } from 'react';
import './WeatherApp.css';
import { Button, Card, CardBody, CardText, CardTitle, FormControl } from 'react-bootstrap';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [error, setError] = useState('');

  const API_KEY = '932b52746f2fc6d49837ad450e771c76';

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
      <CardTitle>Weather App</CardTitle>
      <CardBody className="search-form">
        <FormControl
          type="text"
          placeholder="Enter city"
          value={city}
          className='input-text'
          onChange={(e) => setCity(e.target.value)}
        />
        <FormControl
          type="text"
          placeholder="Enter country"
          value={country}
          className='input-text'
          onChange={(e) => setCountry(e.target.value)}
        />
        <Button variant="success" onClick={fetchWeatherData}>Get Weather</Button>
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
