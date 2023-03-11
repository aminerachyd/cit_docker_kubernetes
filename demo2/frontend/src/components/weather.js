import { useEffect, useState } from "react";

const WEATHER_ENDPOINT = "http://localhost:8080/weather";
const Weather = ({ weatherEndpoint }) => {
  const [hostname, setHostname] = useState("");
  const [weather, setWeather] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(
      (process.env.NODE_ENV === "production" && weatherEndpoint) ||
        WEATHER_ENDPOINT
    )
      .then((response) => response.json())
      .then((data) => {
        setWeather(data.WeatherData);
        setHostname(data.Hostname);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  return (
    <div>
      <h2>Weather, from {hostname}</h2>
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
