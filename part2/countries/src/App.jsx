import { useState, useEffect } from 'react'
import countryService from './services/countryService';
import weatherService from './services/weatherService';

const App = () => {
  const [allCountries, setAllCountries] = useState([]);
  useEffect(() => {
    countryService.getAll().then(
      listCountries => {
        const countryNames = listCountries.map(element => element.name.common);
        setAllCountries(countryNames);
      });
    },[]);

  const [findCountry, setFindCountry] = useState('');
  const [countryFounded, setCountryFounded] = useState([]);
  const [textMessage, setTextMessage] = useState('');
  //const [countryInformation, setCountryInformation] = useState({name: "", capital: "", area: "", languages: [], flag: {}})
  const [countryInformation, setCountryInformation] = useState({})
  const [countryWeather, setCountryWeather] = useState({});

  const handleFindCountryChange = (event) => {
    if(event.target.value !== ""){
      setCountryFounded([]);
      setCountryInformation({});
      setCountryWeather({});
      setFindCountry(event.target.value);
      
      const findCountries = searchCountry(event.target.value);
      if (findCountries.length > 10) {
        setTextMessage("Too many matches, specify another filter");
      }
      else if (findCountries.length <= 10 && findCountries.length > 1) {
        setTextMessage("");
        setCountryFounded(findCountries);
      }
      else if (findCountries.length === 1){
        setTextMessage("");
        setCountryFounded(findCountries);
        getCountry(findCountries);
      }
    }
    else {
      setFindCountry("");
      setTextMessage("");
    }
  }

  const searchCountry = (name) => {
    const result = allCountries.filter(country => country.toLowerCase().includes(name.toLowerCase()));
    return result;
  }
  const getCountry = (name) => {
    countryService.get(name).then(country => {
      const nameCountry = country.name.common;
      const capitalCountry = country.capital;
      const areaCountry = country.area;
      const languagesCountry = country.languages;
      const flagUrlCountry = country.flags.svg;
      const countryObject = {name: nameCountry, capital: capitalCountry, area: areaCountry, languages: languagesCountry, flag: flagUrlCountry};
      setCountryInformation(countryObject);
      setCountryFounded([]);
      getWeather(nameCountry);
    });
  }

  const getWeather = (name) => {
    let weatherObject = {};
    weatherService.get(name).then(weather => {
      if (weather === "Not information available") {
        weatherObject = {temperature: 0, wind: weather, name: name, message: weather, urlIcon:''};
      }
      else{
        const temperature = convertToCelsius(weather.main.temp);
        const wind = weather.wind.speed;
        const country = weather.name;
        const icon = weather.weather[0].icon;
        const urlIcon = `https://openweathermap.org/img/wn/${icon}@2x.png`;
        weatherObject = {temperature: temperature, wind: wind, name: country, message: '', urlIcon: urlIcon};
      }
      
      setCountryWeather(weatherObject);
    }).catch(error => {
        console.log('Error:', error);
    });
  }

  const handleShowCountry = (name) => {
    let findCountries = searchCountry(name);
    if (findCountries.length > 1) {
      findCountries = findCountries.filter(c => c === name);
    }
    setTextMessage("");
    setCountryFounded(findCountries);
    getCountry(findCountries);
  }

  const convertToCelsius = (kelvin) => {
    return kelvin - 273.15;
  }


  return (
    <>
      <div>find countries <input value={findCountry} onChange={handleFindCountryChange}/></div>
      <br></br>
      <div className="list-container">
        {
          countryFounded.map(c => (<span key={c} className="list-item">{c} <button onClick={() => handleShowCountry(c)}>Show</button> </span>) )
        }
        <p>{textMessage}</p>
      </div>
      { Object.keys(countryInformation).length > 0 &&
        <div>
          <h1>{countryInformation.name}</h1>
          <p>Capital {countryInformation.capital}</p>
          <p>Area {countryInformation.area}</p>
          <h2>Languages</h2>
            <ul>
                {Object.entries(countryInformation.languages).map(([code, language]) => (<li key={code} >{language}</li>))}
            </ul>
          <img src={countryInformation.flag} width={200}/>
        </div>
      }
      { Object.keys(countryWeather).length > 0 &&
        <div>
          <h2>Weather in {countryWeather.name} {countryWeather.message}</h2>
          <p>Temperature {countryWeather.temperature.toFixed(2)} Celsius</p>
          <img src={countryWeather.urlIcon} />
          <p>Wind {countryWeather.wind} m/s</p>
        </div>
      }
    </>
  )
}

export default App
