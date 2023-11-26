import { fetchReverseCityLocations } from "./api/OpenWeather";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";

countries.registerLocale(enLocale);

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

export const defaultLocation: WeatherLocation = {
  city: "Portland",
  state: "Oregon",
  country: "United States of America",
  latitude: 45.5152,
  longitude: -122.6784,
};

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

export function getFullCountryName(
  code: string | undefined,
  fallback?: string
): string | undefined {
  if (code === undefined) {
    return fallback;
  }
  return countries.getName(code, "en") ?? fallback;
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
    country: getFullCountryName(firstResult.country, firstResult.country),
    latitude, // use original coordinates
    longitude,
  };
}
