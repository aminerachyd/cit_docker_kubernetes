import "./App.css";

import News from "./components/news";
import Weather from "./components/weather";

function App() {
  return (
    <div className="App">
      <News />
      <hr></hr>
      <Weather />
    </div>
  );
}

export default App;
