import React from 'react';
import { useLocation } from 'react-router-dom';
import '../App.css'



function About() {
  const location = useLocation();
  const day = location.state.day;

  return (
    <div className="details-page">
      

      <h1>Weather Details</h1>
      <p>Date: {day.valid_date}</p>
      <p>Temperature: {day.temp}°C</p>
      <p>Wind Speed: {day.wind_spd}</p>
      <p>Cloud Coverage: {day.clouds}</p>
      <p>Visibility: {day.vis} KM</p>
      <p> Dew point: {day.dewpt}&deg;C</p>

    </div>
  );
}

export default About;

