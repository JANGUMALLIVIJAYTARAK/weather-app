import { useState } from "react";
import SearchBox from "./SearchBox";
import InfoBox from "./assets/InfoBox";

export default function WeatherApp() {
    const [weatherInfo, setWeatherInfo] = useState({
        city: "Wonderland",
        feelslike: 39.96,
        humidity: 56,
        temp: 33.76,
        tempMax: 33.76,
        tempMin: 33.76,
        weather: "broken clouds",
    });

    const [error, setError] = useState(false);

    let updateInfo = (newInfo) => {
        setWeatherInfo(newInfo);
        setError(false); // clear error when update is successful
    };

    let handleError = () => {
        setError(true); // trigger error message
    };

    return (
        <div style={{ textAlign: "center" }}>
            <h2>Weather App by Delta</h2>
            <SearchBox updateInfo={updateInfo} handleError={handleError} />
            {error ? <p style={{ color: "red" }}>No such place in our API!</p> : <InfoBox info={weatherInfo} />}
        </div>
    );
}
