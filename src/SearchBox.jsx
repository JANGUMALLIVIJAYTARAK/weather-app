import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./SearchBox.css";
import { useState } from 'react';
import Box from '@mui/material/Box';

export default function SearchBox({ updateInfo, handleError }) {
    let [city, setCity] = useState("");

    const API_URL = "https://api.openweathermap.org/data/2.5/weather";
    const API_KEY = "e2d5258cc407c0d87b3397a821c238cc";

    let getWeatherInfo = async () => {
        let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
        let jsonResponse = await response.json();

        if (jsonResponse.cod !== 200) {
            throw new Error("City not found");
        }

        let result = {
            city: city,
            temp: jsonResponse.main.temp,
            tempMin: jsonResponse.main.temp_min,
            tempMax: jsonResponse.main.temp_max,
            humidity: jsonResponse.main.humidity,
            feelslike: jsonResponse.main.feels_like,
            weather: jsonResponse.weather[0].description
        };

        return result;
    };

    let handleChange = (evt) => {
        setCity(evt.target.value);
    };

    let handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
            let newInfo = await getWeatherInfo();
            updateInfo(newInfo);
            setCity(""); // clear input on success
        } catch (err) {
            handleError(); // tell WeatherApp to show error
        }
    };

    return (
        <div className='searchbox'>
            <form onSubmit={handleSubmit}>
                <TextField id="city" label="City Name" variant="outlined" required value={city} onChange={handleChange} />
                <br /><br />
                <Button variant="contained" type='submit' color='error'>Search</Button>
            </form>
        </div>
    );
}
