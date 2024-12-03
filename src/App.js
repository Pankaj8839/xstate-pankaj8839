import logo from './logo.svg';
import './App.css';
import { useState,useEffect } from 'react';


function App() {
  const [countryArray , setCountryArray] = useState([]);
  const [stateArray , setStateArray] = useState([]);
  const [cityArray , setCityArray] = useState([]);
  const [country , setCountry] = useState('');
  const [state , setState] = useState('');
  const [city , setCity] = useState('');

  useEffect(() => {
    const fetchCountries= async () => {
      try{
        const response = await fetch('https://crio-location-selector.onrender.com/countries');
        const data = await response.json();
        setCountryArray(data);
      }catch(error){
        console.log(error);
      }
    }
    fetchCountries();
  }, [])


  const handleCountryChange = (e) => {
    setCountry(e.target.value);
    setCityArray([]);
    setStateArray([]); 
    setCity('');
    setState('');
  }

  const handleStateChange = (e) => {
    setState(e.target.value);
    setCityArray([]);
    setCity('');
  }

  const handleCityChange = (e) => {
    setCity(e.target.value);
  }



  useEffect(()=>{
    if(country==="") return;
    const fetchStates = async () => {
      try{
        const response = await fetch(`https://crio-location-selector.onrender.com/country=${country}/states`);
        const data = await response.json();
        setStateArray(data);
      }catch(error){
        console.log(error);
      }
    }
  
    fetchStates();
  },[country])

  useEffect(()=>{
    if(state==="") return; 
    console.log("country in 1",state);   
    const fetchCities = async () => {
      console.log("country in 2",state);
      try{
        const response = await fetch(`https://crio-location-selector.onrender.com/country=${country}/state=${state}/cities`);
        const data = await response.json();
        setCityArray(data);
      }catch(error){
        console.log(error);
      }
    }
    fetchCities();
  },[state])

  return (
    <div className="App">
      <h1>Select Location</h1>
      <select name="country" onChange={(e) =>handleCountryChange(e)}> 
        <option value="">Select Country</option>
        {countryArray.map((country) => (
          <option value={country}>{country}</option>
        ))}
      </select>
      <select name="state" onChange={(e) => handleStateChange(e)} disabled={!country}>
      <option value="">Select State</option>
        { stateArray.map((state)=>(
          <option value={state}>{state}</option>)
        )}
     </select>
     <select  name="city" onChange={(e) => handleCityChange(e)} disabled={!state}>
      <option value="">Select City</option>
         { cityArray.map((city)=>(
          <option value={city}>{city}</option>)
        )}
     </select>
     <br></br>
     {city==="" ? null:<><span>You Selected </span><span className='city'>{city}, </span><span className='state'>{state}, {country}</span></>}
    </div>
  );
}

export default App;
