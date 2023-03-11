import "./App.css";

import News from "./components/news";
import Weather from "./components/weather";
import config from "./config.json";

function App() {
  const newsEndpoint = config.NEWS_ENDPOINT;
  const weatherEndpoint = config.WEATHER_ENDPOINT;
  return (
    <div className="App">
      <News newsEndpoint={newsEndpoint} />
      <hr></hr>
      <Weather weatherEndpoint={weatherEndpoint} />
    </div>
  );
}

export default App;
