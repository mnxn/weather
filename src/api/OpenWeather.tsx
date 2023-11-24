const API_BASE_URL = "https://api.openweathermap.org/data/2.5";
const API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

interface OpenWeatherMapResponse {
  list: {
    dt_txt: string;
    main: {
      temp_max: number;
      temp_min: number;
    };
  }[];
}

interface CurrentWeather {
  temperature: number;
  humidity: number;
  weatherDescription: string;
}

export interface FiveDayForecast {
  temperature: number;
  humidity: number;
  weatherDescription: string;
}

interface UVIndex {
  value: number;
}
interface DailyTemperature {
  day: number;
  min: number;
  max: number;
  night: number;
  eve: number;
  morn: number;
}
interface WeatherCondition {
  id: number;
  main: string;
  description: string;
}
export interface DailyData {
  dt: number;
  temp: DailyTemperature;
  weather: WeatherCondition[];
  sunrise: number;
  sunset: number;
}

export interface HistoricalWeather {
  daily: DailyData[];
}

interface DailyForecast {
  temperature: {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
  };
  humidity: number;
  weatherDescription: string;
}

export async function fetchCurrentWeather(
  latitude: number,
  longitude: number
): Promise<CurrentWeather> {
  const endpoint = "/weather";
  const apiUrl = `${API_BASE_URL}${endpoint}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;
  const response = await fetch(apiUrl);

  if (response.ok) {
    const data = await response.json();
    const currentWeather: CurrentWeather = {
      temperature: data.main.temp,
      humidity: data.main.humidity,
      weatherDescription: data.weather[0].description,
      // Map more fields as needed
    };
    return currentWeather;
  } else {
    throw new Error(
      `Failed to fetch current weather data from OpenWeatherMap API for endpoint: ${endpoint}`
    );
  }
}

export async function fetchForecastByCityTwoWeeks(
  city: string
): Promise<OpenWeatherMapResponse> {
  const endpoint = "/forecast";
  const apiUrl = `${API_BASE_URL}${endpoint}?q=${city}&cnt=16&appid=${API_KEY}`;
  const response = await fetch(apiUrl);

  if (response.ok) {
    const data = await response.json();

    const forecast: OpenWeatherMapResponse = { list: data.list };
    return forecast;
  } else {
    throw new Error(
      `Failed to fetch forecast data from OpenWeatherMap API for endpoint: ${endpoint}`
    );
  }
}

export async function fetchFiveDayForecast(
  latitude: number,
  longitude: number
): Promise<FiveDayForecast> {
  const endpoint = "/forecast";
  const apiUrl = `${API_BASE_URL}${endpoint}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;
  const response = await fetch(apiUrl);

  if (response.ok) {
    const data = await response.json();
    // Extract 5-day forecast data from the API response
    const fiveDayForecast: FiveDayForecast = {
      temperature: data.list[0].main.temp,
      humidity: data.list[0].main.humidity,
      weatherDescription: data.list[0].weather[0].description,
    };
    return fiveDayForecast;
  } else {
    throw new Error(
      `Failed to fetch 5-day forecast data from OpenWeatherMap API for endpoint: ${endpoint}`
    );
  }
}

export async function fetchUVIndex(
  latitude: number,
  longitude: number
): Promise<UVIndex> {
  const endpoint = "/uvi";
  const apiUrl = `${API_BASE_URL}${endpoint}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;
  const response = await fetch(apiUrl);

  if (response.ok) {
    const data = await response.json();
    const uvIndex: UVIndex = {
      value: data.value,
    };
    return uvIndex;
  } else {
    throw new Error(
      `Failed to fetch UV Index data from OpenWeatherMap API for endpoint: ${endpoint}`
    );
  }
}

export async function fetchAllWeather(
  latitude: number,
  longitude: number
): Promise<HistoricalWeather> {
  const endpoint = "/onecall";
  const apiUrl = `${API_BASE_URL}${endpoint}?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&appid=${API_KEY}`;
  const response = await fetch(apiUrl);

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error(
      `Failed to fetch historical weather data from OpenWeatherMap API for endpoint: ${endpoint}`
    );
  }
}

export async function fetchHistoricalWeather(
  latitude: number,
  longitude: number,
  time: number
): Promise<HistoricalWeather> {
  const endpoint = "/onecall/timemachine";
  const apiUrl = `${API_BASE_URL}${endpoint}?lat=${latitude}&lon=${longitude}&dt=${time}&appid=${API_KEY}`;
  const response = await fetch(apiUrl);

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error(
      `Failed to fetch historical weather data from OpenWeatherMap API for endpoint: ${endpoint}`
    );
  }
}
export async function fetchDailyForecast(
  latitude: number,
  longitude: number
): Promise<DailyForecast> {
  const endpoint = "/forecast/daily";
  const apiUrl = `${API_BASE_URL}${endpoint}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;
  const response = await fetch(apiUrl);

  if (response.ok) {
    const data = await response.json();
    // Extract daily forecast data from the API response
    const dailyForecast: DailyForecast = {
      temperature: {
        day: data.list[0].temp.day,
        min: data.list[0].temp.min,
        max: data.list[0].temp.max,
        night: data.list[0].temp.night,
        eve: data.list[0].temp.eve,
        morn: data.list[0].temp.morn,
      },
      humidity: data.list[0].humidity,
      weatherDescription: data.list[0].weather[0].description,
    };
    return dailyForecast;
  } else {
    throw new Error(
      `Failed to fetch daily forecast data from OpenWeatherMap API for endpoint: ${endpoint}`
    );
  }
}
