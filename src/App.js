import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import axios from "axios";

const containerStyle = {
  width: "100%",
  height: "600px",
};

const center = {
  lat: 0,
  lng: 0,
};

function App() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [city, setCity] = useState("");
  const [temperature, setTemperature] = useState("");
  const [weather, setWeather] = useState("");

  useEffect(() => {
    // Lấy vị trí hiện tại của người dùng
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }, []);

  useEffect(() => {
    if (latitude && longitude) {
      // Gọi API của OpenWeatherMap để lấy thông tin thời tiết
      const apiKey = "2c422a76b6ac7a9cb7cfbcc6d1d589be";
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
      axios
        .get(apiUrl)
        .then((response) => {
          const data = response.data;
          setCity(data.name);
          setTemperature(data.main.temp);
          setWeather(data.weather[0].description);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [latitude, longitude]);

  return (
    <LoadScript googleMapsApiKey="AIzaSyBXeSp8gTtdWA5d3FUOepB8m_h3RIfrBPs">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={8}>
        {latitude && longitude && (
          <Marker position={{ lat: latitude, lng: longitude }} />
        )}
      </GoogleMap>
      <div id="weather-info">
        <h2>{city}</h2>
        <p>Temperature: {temperature}°C</p>
        <p>Weather: {weather}</p>
      </div>
    </LoadScript>
  );
}

export default App;
