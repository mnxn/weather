// Weather Data Fetcher
//
// This module provides a function to fetch weather data from the open-meteo.com API.
// It retrieves the current temperature, humidity, and weather code for a specific location.
//
// @param latitude - The latitude of the location.
// @param longitude - The longitude of the location.
// @returns A Promise that resolves to an object containing weather data.

const API_URL = "https://api.open-meteo.com/v1/forecast";
const ARCHIVE_API_URL = "https://archive-api.open-meteo.com/v1/archive";

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

export interface SunsetData {
  time: string[];
  sunrise: string[];
  sunset: string[];
}

export async function fetchSunsetData(
  latitude: number,
  longitude: number,
  year: number
): Promise<SunsetData> {
  // Construct the API URL based on the provided latitude and longitude
  const url = `${ARCHIVE_API_URL}?latitude=${latitude}&longitude=${longitude}&start_date=${year}-01-01&end_date=${year}-12-31&daily=sunrise,sunset&timezone=GMT`;

  // Make an asynchronous HTTP GET request to the API
  // Force cache because data from the previous year will not change.
  const response = await fetch(url, { cache: "force-cache" });

  if (response.ok) {
    const data = await response.json();

    return data.daily;
  } else {
    throw new Error("Failed to fetch data");
  }
}
