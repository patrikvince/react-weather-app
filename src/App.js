import { useState, useEffect } from 'react';

import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { Form } from './components/Form';
import { Error } from './components/Error';

//npm install dotenv
require('dotenv').config();

function App() {
  const [city, setCity] = useState('');
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
  const [long, setLong] = useState([]);
  const [lat, setLat] = useState([]);
  const apiUrl1 = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}`;
  const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });

      await fetch(apiUrl1)
        .then(res => res.json())
        .then(result => {
          setApiData(result);
        });
    }
    fetchData();
  }, [lat, long]);

  //Api call when city name is change
  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setApiData(data));
  }, [apiUrl]);

  async function updateCity(city) {
    await setCity(city);
  }

  const kelvinToCelsius = (temp) => {
    return (temp - 273.15).toFixed(1);
  }

  return (
    <div className='container'>
      <Header />
      <Form
        city={city}
        updateCity={updateCity} />
      {//if can't read a data, return the Error component 
        apiData.main ? (
          <div className='content'>
            <img
              src={`http://openweathermap.org/img/w/${apiData.weather[0].icon}.png`}
              alt="weather-icon"
            />
            <h1>{kelvinToCelsius(apiData.main.temp)} &deg;C</h1>
            <h2>{apiData.name}</h2>
            <p>{apiData.sys.country}</p>
          </div>
        ) : (
          <Error />
        )}
      <Footer />
    </div>
  );
}

//styles 
/*
// You can use like this as well with style={container} (like in the Header.js)

const container = {
  maxWidth: '100%',
    fontFamily: 'Poppins, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    aligItems: 'center'

}

*/
export default App;
