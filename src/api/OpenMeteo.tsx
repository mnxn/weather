// Weather Data Fetcher
//
// This module provides a function to fetch weather data from the open-meteo.com API.
// It retrieves the current temperature, humidity, and weather code for a specific location.
//
// @param latitude - The latitude of the location.
// @param longitude - The longitude of the location.
// @returns A Promise that resolves to an object containing weather data.
import { WmoCode } from "../components/WmoCode";

const API_BASE_URL = "https://api.open-meteo.com/v1/forecast";
const API_ARCHIVE_URL = "https://archive-api.open-meteo.com/v1/archive";
const API_GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search";
const API_ELEVATION_URL = "https://api.open-meteo.com/v1/elevation";

export interface DailyData {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  weather_code: WmoCode[];
  //weather_code: number;
}

interface WeatherData {
  current: {
    temperature: number;
    humidity: number;
    weathercode: string;
  };
  // Add more fields as needed
}

export interface SunsetData {
  daily: {
    time: string[];
    sunrise: string[];
    sunset: string[];
  };
}

export interface HistoricalWeatherData {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  daily_units: {
    time: string;
    temperature_2m_max: string;
    temperature_2m_min: string;
  };
  daily: DailyData;
}

export interface CityLocation {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  elevation: number;
  timezone: string;
  feature_code: string;
  country_code?: string;
  country?: string;
  country_id?: number;
  population?: number;
  postcodes?: string[];
  admin1?: string;
  admin2?: string;
  admin3?: string;
  admin4?: string;
  admin1_id?: number;
  admin2_id?: number;
  admin3_id?: number;
  admin4_id?: number;
}

export async function fetchTimeZone(
  latitude: number,
  longitude: number,
): Promise<string> {
  // Construct the API URL based on the provided latitude and longitude
  const url = `${API_BASE_URL}?latitude=${latitude}&longitude=${longitude}&timezone=auto`;

  // Make an asynchronous HTTP GET request to the API
  const response = await fetch(url);

  if (response.ok) {
    const data = (await response.json()) as { timezone: string };
    return data.timezone;
  } else {
    throw new Error("Failed to fetch data");
  }
}

export async function fetchElevation(
  latitude: number,
  longitude: number,
): Promise<number> {
  // Construct the API URL based on the provided latitude and longitude
  const url = `${API_ELEVATION_URL}?latitude=${latitude}&longitude=${longitude}`;

  // Make an asynchronous HTTP GET request to the API
  const response = await fetch(url);

  if (response.ok) {
    const data = (await response.json()) as { elevation: number[] };
    return data.elevation[0];
  } else {
    throw new Error("Failed to fetch data");
  }
}

export async function fetchWeatherData(
  temperatureUnit: "celsius" | "fahrenheit",
  latitude: number,
  longitude: number,
): Promise<WeatherData> {
  // Construct the API URL based on the provided latitude and longitude
  const url = `${API_BASE_URL}?latitude=${latitude}&longitude=${longitude}&current_weather=true&temperature_unit=${temperatureUnit}`;

  // Make an asynchronous HTTP GET request to the API
  const response = await fetch(url);

  if (response.ok) {
    return (await response.json()) as WeatherData;
  } else {
    throw new Error("Failed to fetch data");
  }
}

export interface CombinedData {
  current: {
    time: string;
    temperature_2m: number;
    relative_humidity_2m: number;
    weather_code: number;
    cloud_cover: number;
    wind_speed_10m: number;
  };

  hourly: {
    time: string[];
    temperature_2m: number[];
    relative_humidity_2m: number[];
    precipitation_probability: number[];
  };

  daily: {
    time: string[];
    weather_code: WmoCode[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  };
}

export async function fetchCombinedData(
  temperatureUnit: "celsius" | "fahrenheit",
  latitude: number,
  longitude: number,
  days: number,
): Promise<CombinedData> {
  // Construct the API URL based on the provided latitude and longitude
  const url = `${API_BASE_URL}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,cloud_cover,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,precipitation_probability&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=${days}&temperature_unit=${temperatureUnit}`;


  // Make an asynchronous HTTP GET request to the API
  const response = await fetch(url);

  if (response.ok) {
    return (await response.json()) as CombinedData;
  } else {
    throw new Error("Failed to fetch data");
  }
}

export async function fetchHistoricalWeatherData(
  temperatureUnit: "celsius" | "fahrenheit",
  latitude: number,
  longitude: number,
  year: number,
): Promise<HistoricalWeatherData> {
  // Construct the API URL based on the provided latitude and longitude
  const url = `${API_ARCHIVE_URL}?latitude=${latitude}&longitude=${longitude}&start_date=${
    year - 1
  }-11-01&end_date=${year}-10-31&daily=weather_code,temperature_2m_max,temperature_2m_min&temperature_unit=${temperatureUnit}`;

  // Make an asynchronous HTTP GET request to the API
  // Force cache because data from the previous year will not change.
  const response = await fetch(url, { cache: "force-cache" });

  if (response.ok) {
    return (await response.json()) as HistoricalWeatherData;
  } else {
    throw new Error("Failed to fetch data");
  }
}

export async function fetchSunsetData(
  latitude: number,
  longitude: number,
  year: number,
): Promise<SunsetData> {
  // Construct the API URL based on the provided latitude and longitude
  const url = `${API_ARCHIVE_URL}?latitude=${latitude}&longitude=${longitude}&start_date=${year}-01-01&end_date=${year}-12-31&daily=sunrise,sunset&timezone=GMT`;

  // Make an asynchronous HTTP GET request to the API
  // Force cache because data from the previous year will not change.
  const response = await fetch(url, { cache: "force-cache" });

  if (response.ok) {
    return (await response.json()) as SunsetData;
  } else {
    throw new Error("Failed to fetch data");
  }
}

export async function fetchCityLocations(
  name: string,
): Promise<CityLocation[]> {
  // Construct the API URL based on the provided latitude and longitude
  const url = `${API_GEOCODING_URL}?name=${name}&count=10&language=en&format=json`;

  // Make an asynchronous HTTP GET request to the API
  const response = await fetch(url);

  if (response.ok) {
    const data = (await response.json()) as { results?: CityLocation[] };
    return data.results ?? [];
  } else {
    throw new Error("Failed to fetch data");
  }
}