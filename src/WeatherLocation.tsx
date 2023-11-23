export interface WeatherLocation {
  city?: string;
  state?: string;
  country?: string;
  latitude: number;
  longitude: number;
}

export interface WeatherLocationProps {
  weatherLocation: WeatherLocation;
  setWeatherLocation: (location: WeatherLocation) => void;
}
