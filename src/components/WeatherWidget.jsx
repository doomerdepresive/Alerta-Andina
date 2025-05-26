import React, { useState, useEffect } from 'react';
import './WeatherWidget.css';

const API_KEY = '80231725a0738539062f4606921e29c9'; // Reemplazar con tu API key de OpenWeatherMap
const API_URL = 'https://api.openweathermap.org/data/2.5';

function WeatherWidget({ city }) {
    const [weather, setWeather] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const [weatherRes, forecastRes] = await Promise.all([
                    fetch(`${API_URL}/weather?q=${city},bo&units=metric&appid=${API_KEY}`),
                    fetch(`${API_URL}/forecast?q=${city},bo&units=metric&appid=${API_KEY}`)
                ]);

                const weatherData = await weatherRes.json();
                const forecastData = await forecastRes.json();

                setWeather(weatherData);
                setForecast(forecastData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching weather data:', error);
                setLoading(false);
            }
        };

        fetchWeather();
    }, [city]);

    if (loading) return <div className="weather-widget loading">Cargando...</div>;
    if (!weather) return null;

    return (
        <div className="weather-widget">
            <div className="current-weather">
                <h2>Tiempo en {city}</h2>
                <div className="weather-main">
                    <img
                        src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                        alt={weather.weather[0].description}
                    />
                    <div className="temperature">
                        {Math.round(weather.main.temp)}°C
                    </div>
                </div>
                <div className="weather-details">
                    <p>{weather.weather[0].description}</p>
                    <p>Humedad: {weather.main.humidity}%</p>
                    <p>Viento: {Math.round(weather.wind.speed * 3.6)} km/h</p>
                </div>
            </div>

            <div className="forecast">
                <h3>Próximos días</h3>
                <div className="forecast-list">
                    {forecast?.list?.slice(0, 5).map((item, index) => (
                        <div key={index} className="forecast-item">
                            <span>{new Date(item.dt * 1000).toLocaleDateString('es', { weekday: 'short' })}</span>
                            <img
                                src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                                alt={item.weather[0].description}
                            />
                            <span>{Math.round(item.main.temp)}°C</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default WeatherWidget;