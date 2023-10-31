import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';




import '../App.css'


function Home() {
    const navigate = useNavigate();

    // Function to navigate to the About page
    const navigateToAbout = (day) => {
      navigate('/about', { state: { day } });
    };


    const [cityData, setCityData] = useState(null);
    const [dailyData, setDailyData] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [searchDate, setSearchDate] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showDetails, setShowDetails] = useState(false);
    const [selectedDay, setSelectedDay] = useState(null);

  
    const apiKey = '61a78caf8bb447b8a5ef48d7c4c71d50'; 
    const location = 'Starkville,MS';
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          //Fetch current weather data
          const currentResponse = await fetch(`https://api.weatherbit.io/v2.0/current?city=${location}&key=${apiKey}`);
          const currentResult = await currentResponse.json();
          setCityData(currentResult.data[0]);
  
          //Fetch 15 days of daily weather data
          const dailyResponse = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?city=${location}&key=${apiKey}&days=15`);
          const dailyResult = await dailyResponse.json();
          setDailyData(dailyResult.data);
        } catch (error) {
          console.error('Error fetching data', error);
        }
      };
      fetchData();
    }, []);
  
    //Function to convert Celsius to Fahrenheit
    const celsiusToFahrenheit = (celsius) => ((celsius * 9/5) + 32).toFixed(1);
  
    //Handle temperature filter
    const handleTemperatureFilter = (filter) => {
      setSelectedFilter(filter);
      setSearchResults([]); //Clear search results when a filter is applied
    };
  
    //Handle date search
    const handleDateSearch = () => {
      if (!searchDate) {
        setSearchResults([]);
      } else {
        const formattedDate = searchDate.trim();
        const results = dailyData.filter((day) => day.valid_date === formattedDate);
  
        setSearchResults(results);
      }
    };
  
    //Filter the dailyData based on the selected filter
    const filteredData = selectedFilter === 'all' ? dailyData : dailyData.filter((day) => {
      const temperature = celsiusToFahrenheit(day.temp);
  
      if (selectedFilter === '50-and-under') {
        return temperature <= 50;
      } else if (selectedFilter === '60-to-80') {
        return temperature >= 60 && temperature <= 80;
      } else if (selectedFilter === '80-and-up') {
        return temperature > 80;
      }
  
      return true;
    });
  
    const handleDetailsClick = (day) => {
      setSelectedDay(day);
      setSelectedDayData(day); // Store the data of the selected day
      setShowDetails(true);
    };
  
    const chartData = {
        labels: ['Label 1', 'Label 2', 'Label 3'],
        datasets: [
          {
            label: 'My Data',
            data: [12, 19, 3],
            backgroundColor: ['red', 'blue', 'green'],
          },
        ],
      };
    
      const options = {
        scales: {
          y: {
            beginAtZero: true, // Start the y-axis at zero
          },
        },
      };
      
  
    return (
        
      <div className="weather-container">
        <div className="weather-box">
          <h2>Usa Weather Information</h2>
          <div className="filter-buttons">
            <button className='button' onClick={() => handleTemperatureFilter('50-and-under')}>50°F and Under</button>
            <button className='button' onClick={() => handleTemperatureFilter('60-to-80')}>60°F to 80°F</button>
            <button className='button' onClick={() => handleTemperatureFilter('80-and-up')}>80°F and Up</button>
            <button className='button' onClick={() => handleTemperatureFilter('all')}>Show All</button>
          </div>
          <div className="search-bar">
            <input
              type="text"
              style={{ fontSize: '14px', width: '200px', height: '30px' }}
  
              placeholder="Search date (ex, 2023-10-23)"
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
            />
            <button onClick={handleDateSearch}>Search</button>
          </div>                
        </div>
        {cityData && (
          <div className="weather-box">
            <div className="weather-card">
              <h3>City: Starkville, MS</h3>
              <div className="card">
                <h4>Current Temperature</h4>
                <p>{cityData.temp}&deg;C ({celsiusToFahrenheit(cityData.temp)}&deg;F)</p>
                <p>As of: {cityData.ob_time}</p>
              </div>
            </div>
          </div>
        )}
        <div className="weather-box">
          <h3>Sunrise Time</h3>
          <p>{cityData && cityData.sunrise}</p>
        </div>
        {(searchResults.length > 0 ? searchResults : filteredData).length > 0 && (
          <div className="weather-box">
            <div className="weather-list">
              <h2>15-Day Weather Forecast</h2>
              <table>
                <thead>
                  <tr>
                    <th>DATE</th>
                    <th>TEMPERATURE</th>
                    <th>Wind Speed</th>
                    <th>Cloud Coverage</th>
                    <th>Details</th>
  
                  </tr>
                </thead>
                <tbody>
                  {(searchResults.length > 0 ? searchResults : filteredData).map((day, index) => (
                    <tr key={index}>
                      <td>{day.valid_date}</td>
                      <td>({celsiusToFahrenheit(day.temp)}°F)</td>
                      <td>{day.wind_spd}</td>
                      <td>{day.clouds}</td>
                  <td>
                  <button onClick={() => navigateToAbout(day)}>Details</button>
  
                </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>  
            
          </div>
        )}
      </div>
    );
  }

export default Home;
