import { useEffect, useState } from "react";

const WEATHER_ENDPOINT = "http://localhost:8080/weather";
const Weather = () => {
  const [weather, setWeather] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(WEATHER_ENDPOINT)
      .then((response) => response.json())
      .then((data) => {
        setWeather(data);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  return (
    <div>
      <h2>Weather</h2>
      {error && <p>{error.message}</p>}
      {weather.map((item) => (
        <div key={item.city}>
          <h3>City name: {item.City}</h3>
          <p>Temperature : {item.Temperature}</p>
          <p>Humidity : {item.Humidity}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Weather;
