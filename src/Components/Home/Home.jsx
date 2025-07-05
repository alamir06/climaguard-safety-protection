import React, { useEffect, useState } from 'react';
import clim from "../../assets/clim.png"; // You can replace this with a transparent cloud icon or weather background
import "./home.css";
import { fetchWeatherByCoords } from '../../Card/Weather';

const Home = () => {
   const [weather, setWeather] = useState(null);
   console.log(weather);
   
    const [locationStatus, setLocationStatus] = useState("Getting location...");
    // console.log(locationStatus);
    
 useEffect(() => {
    if (!navigator.geolocation) {
      setLocationStatus("Geolocation is not supported by your browser");
    } else {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          console.log(latitude,longitude);
          
          try {
            const data = await fetchWeatherByCoords(latitude, longitude);
            setWeather(data);
            setLocationStatus(`📍 ${data.name}`);
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
        <span className="location">{locationStatus}</span>
        {weather && (
          <h1 className="temperature">{Math.round(weather.main.temp)}°C</h1>
        )}
      </div>

      {weather && (
        <div className="weather-status">
          <div className="card">
            🌡️ <div><h3>Humidity</h3><p>{weather.main.humidity}%</p></div>
          </div>
          <div className="card">
            🌬️ <div><h3>Wind</h3><p>{weather.wind.speed} m/s</p></div>
          </div>
          <div className="card">
            🌧️ <div><h3>Condition</h3><p>{weather.weather[0].description}</p></div>
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
