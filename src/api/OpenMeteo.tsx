
// Weather Data Fetcher
//
// This module provides a function to fetch weather data from the open-meteo.com API.
// It retrieves the current temperature, humidity, and weather code for a specific location.
//
// @param latitude - The latitude of the location.
// @param longitude - The longitude of the location.
// @returns A Promise that resolves to an object containing weather data.

const API_URL = "https://api.open-meteo.com/v1/forecast";

interface WeatherData {
  temperature: number;
  humidity: number;
  weathercode: string;
  // Add more fields as needed
}

export async function fetchWeatherData(
  latitude: number,
  longitude: number
): Promise<WeatherData> {
  // Construct the API URL based on the provided latitude and longitude
  const url = `${API_URL}?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

  // Make an asynchronous HTTP GET request to the API
  const response = await fetch(url);

  if (response.ok) {
    const data = await response.json();

    const weatherData: WeatherData = {
      temperature: data.current_weather.temperature,
      humidity: data.current_weather.humidity,
      weathercode: data.current_weather.weathercode,
      // Map more fields as needed
    };
    return weatherData;
  } else {
    throw new Error("Failed to fetch data");
  }
}