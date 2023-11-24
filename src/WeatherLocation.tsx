import countries from "i18n-iso-countries";
import { fetchReverseCityLocations } from "./api/OpenWeather";

countries.registerLocale(await import("i18n-iso-countries/langs/en.json"));

export interface WeatherLocation {
  city?: string;
  state?: string;
  country?: string;
  latitude: number;
  longitude: number;
  elevation?: number;
}

export interface WeatherLocationProps {
  weatherLocation: WeatherLocation;
  setWeatherLocation: (location: WeatherLocation) => void;
}

export function formatLatitude(latitude: number): string {
  const direction = latitude > 0 ? "N" : "S";
  return `${Math.abs(latitude).toFixed(2)} °${direction}`;
}

export function formatLongitude(longitude: number): string {
  const direction = longitude > 0 ? "E" : "W";
  return `${Math.abs(longitude).toFixed(2)} °${direction}`;
}

export function formatElevation(elevation: number): string {
  return `${elevation.toFixed(1)} ft`;
}

export async function reverseWeatherLocation(
  latitude: number,
  longitude: number
): Promise<WeatherLocation> {
  const data = await fetchReverseCityLocations(latitude, longitude);
  if (data.length === 0) {
    throw new Error(
      "Received no results from OpenWeatherMap reverse geocoding."
    );
  }

  const firstResult = data[0];
  return {
    city: firstResult.name,
    state: firstResult.state,
    country:
      countries.getName(firstResult.country, "en") ?? firstResult.country,
    latitude, // use original coordinates
    longitude,
  };
}
