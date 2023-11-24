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
