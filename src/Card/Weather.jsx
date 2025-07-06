import axios from 'axios';

 export const API_KEY = "16e49f6a779573bd0ebe6f822fe7e41b";

export const fetchWeatherByCoords = async (lat, lon) => {
  const url = `https://api.openweathermap.org/data/2.5/weather`;
  const res = await axios.get(url, {
    params: {
      lat,
      lon,
      appid: API_KEY,
      units: 'metric'
    }
  });
  return res.data;
};
