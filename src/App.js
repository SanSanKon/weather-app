import React, {useState, useEffect} from 'react';
import axios from 'axios';
//Styles
import './styles/app.scss';

function App() {

  const [weather, setWeather] = useState(null);
  const [input, setInput] = useState('');

  useEffect(() => {
    axios.get(`http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API}&q=Novosibirsk&aqi=no`)
      .then(data => {
        setWeather(data.data);
      })
      .catch(err => console.log(err));
  }, []);

  const weatherInput = (e) => {
      setInput(e.target.value);
  };

  const searchWeather = () => {
    axios.get(`http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API}&q=${input}`)
    .then(data => {
      setWeather(data.data);
    })
  };

  return (
    <div className='main'>
    <h1>Welcome to the weather search applictaion!</h1>
    <div className='line'></div>
    {weather && (
      <div className='main-wrapper'>
        <div className='search'>
        <h2>Please enter location:</h2>
          <div className='search-wrapper'>
            <input onChange={weatherInput} type='text' />
            <button className='searchButton' onClick={searchWeather}>Search</button>
          </div>
        </div>
        <div className='weather-info'>
          <h2><span>Location:</span> {weather.location.name}</h2>
          <h2><span>Location region:</span> {weather.location.region}</h2>
          <div className='condition'>
            <h3><span>Current weather condition:</span> {weather.current.condition.text}</h3>
            <img src={weather.current.condition.icon} alt='icon' />
            <h3><span>Current temperature:</span> {weather.current.temp_c} Celsius / {weather.current.temp_f} Fahrenheit </h3>
          </div>
        </div>
      </div>
    )}
    <div className='line'></div>
    <h4>Have a nice day and welcome back!</h4>
    </div>
  );
}

export default App;

