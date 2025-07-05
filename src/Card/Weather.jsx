import axios from 'axios';

const API_KEY = "16e49f6a779573bd0ebe6f822fe7e41b"; // Replace this with your OpenWeatherMap key

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
// console.log(res.data);

  return res.data;
};
