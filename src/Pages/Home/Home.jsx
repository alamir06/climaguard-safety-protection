import React, { useEffect, useState } from 'react';
import clim from "../../assets/clim.png"; 
import "./home.css";
import { fetchWeatherByCoords } from '../../Card/Weather';
import { FaWind, FaChevronDown } from 'react-icons/fa';

const Home = () => {
  const [weather, setWeather] = useState(null);
  const [locationStatus, setLocationStatus] = useState("Getting location...");

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationStatus("Geolocation is not supported by your browser");
    } else {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const data = await fetchWeatherByCoords(latitude, longitude);
            setWeather(data);
            setLocationStatus(`${data.name}`);
          } catch (err) {
            setLocationStatus("Error fetching weather");
            console.error(err);
          }
        },
        (error) => {
          setLocationStatus("Location permission denied.");
          console.error(error);
        }
      );
    }
  }, []);

  return (
    <div className="home">
      <div className="top-section">
        <div className="top-bar">
          <span className="app-title">ClimaGuard</span>
          <div className="dropdown-wrapper">
            <select className="forecast-select">
              <option value="current">Current</option>
              <option value="hourly">Hourly</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
            </select>
            <FaChevronDown className="dropdown-icon" />
          </div>
        </div>

        <div className="hero-main-content">
          <h1 className="location">{locationStatus}</h1>
          {weather && (
            <h1 className="temperature">{Math.round(weather.main.temp)}°C</h1>
          )}
        </div>
      </div>

      {weather && (
        <div className="weather-status">
          <div className="card">
            <div><h3>Humidity</h3><p>{weather.main.humidity}%</p></div>
          </div>
          <div className="card">
            <div><h3><FaWind /> Wind</h3><p>{weather.wind.speed} m/s</p></div>
          </div>
          <div className="card">
            <div><h3>Condition</h3><p>{weather.weather[0].description}</p></div>
          </div>
        </div>
      )}

      <div className="action-buttons">
        <button className="btn">🔍 Plan Trip</button>
        <button className="btn red">🚨 Emergency</button>
      </div>
      <div className="guard-btn">
        <button className="btn shield">🛡️ Guard ON</button>
      </div>
    </div>
  );
};

export default Home;
