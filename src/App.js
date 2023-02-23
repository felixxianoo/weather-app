import { useState } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass,faLocationDot, faTemperatureHalf } from '@fortawesome/free-solid-svg-icons';


function App() {

const api = {
  key: "3ba84f07cf80a3683560374803eba82e",
  base: "https://api.openweathermap.org/data/2.5/",
};

  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});

  const searchPressed = () => { 
   if(!search){
    alert('Enter City')
    return
   };

    fetch(`${api.base}weather?q=${search}&units=imperial&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
      });
      setSearch('')
  };

  const keyPress = (event) => {
    if(event.key === 'Enter'){
      searchPressed()
    };
    
  };

  return (
    <div className="App">
      <div className="verse">
      6 Whatever the Lord pleases, He does,
In heaven and in earth, in the seas and in all deeps.
7 He causes the vapors to ascend from the ends of the earth;
Who makes lightnings for the rain,
Who brings forth the wind from His treasuries. Psalm 135:6-7 NASB1995
      </div>
        <div className='search'>
        <input className='input' type="text" placeholder='Enter city...' 
        onChange={(e) => setSearch(e.target.value)} 
        value={search}
        onKeyPress={keyPress}
        />
        <button onClick={searchPressed} className='search-btn'><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
        </div>
      <div className="main-display">
        <div className="top">
        <div className="location">
        <h2>{weather.message}</h2>
        {weather.name ? <h1><FontAwesomeIcon icon={faLocationDot}/>   {weather.name}</h1> : null}
          
          </div>
        <div className="climate">
        {weather.main ? <h1><FontAwesomeIcon icon={faTemperatureHalf}/>    {weather.main.temp.toFixed()}°F</h1> : null}
        </div>
        </div> 
        {weather.name !== undefined &&
        <div className="conditions">
          <div className="feels-like">
          {weather.main ? <p>{weather.main.feels_like.toFixed()}°F</p> : null}
          <p>feels like</p>
          </div>
          <div className="humidity">
          {weather.main ? <p>{weather.main.humidity}%</p> : null}
          <p>humidity</p>
          </div>
          <div className="wind">
          {weather.wind ? <p>{weather.wind.speed.toFixed()} MPH</p> : null}
            <p>wind</p>
            </div>
        </div>
      }
      </div>
     </div>
  )
}

export default App;
