interface WeatherResponse {
    location: {
      name: string;
      region: string;
      country: string;
    };
    current: {
      temp_c: number;
      condition: {
        text: string;
        icon: string;
      };
    };
  }
  
  interface WeatherForecastResponse {
    location: {
      name: string;
      region: string;
      country: string;
    };
    forecast: {
      forecastday: Array<{
        date: string;
        day: {
          maxtemp_c: number;
          mintemp_c: number;
          condition: {
            text: string;
            icon: string;
          };
        };
      }>;
    };
  }
  
  const API_KEY = process.env.WeatherApiKey;
  const BASE_URL = "http://api.weatherapi.com/v1";
  
  // Function to fetch current weather by city name
  export async function getWeatherByCity(city: string): Promise<WeatherResponse> {
    const response = await fetch(
      `${BASE_URL}/current.json?key=${API_KEY}&q=${city}`
    );
    const data = await response.json();
    return data;
  }
  
  // Function to fetch weather forecast by city name
  export async function getWeatherForecastByCity(
    city: string
  ): Promise<WeatherForecastResponse> {
    const endpoint = "/forecast.json";
  
    const response = await fetch(
      `${BASE_URL}${endpoint}?key=${API_KEY}&q=${city}`
    );
    const data = await response.json();
    return data;
  }
  
  // Function to fetch current weather by latitude and longitude
  export async function getWeatherByCoordinates(
    lat: number,
    lon: number
  ): Promise<WeatherResponse> {
    const endpoint = "/current.json";
    const response = await fetch(
      `${BASE_URL}${endpoint}?key=${API_KEY}&q=${lat},${lon}`
    );
    const data = await response.json();
    return data;
  }
  
  // Function to fetch weather forecast by latitude and longitude
  export async function getWeatherForecastByCoordinates(
    lat: number,
    lon: number
  ): Promise<WeatherForecastResponse> {
    const endpoint = "/forecast.json";
  
    const response = await fetch(
      `${BASE_URL}${endpoint}?key=${API_KEY}&q=${lat},${lon}`
    );
    const data = await response.json();
    return data;
  }