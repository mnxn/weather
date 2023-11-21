import { HistoricalWeatherData } from "../../api/OpenMeteo";

interface MonthlyData {
  labels: string[];
  highestTemps: number[];
  lowestTemps: number[];
}

interface WeatherDistributionData {
  labels: string[];
  data: number[];
}

export interface FormattedData {
  monthly: MonthlyData;
  weatherDistribution: WeatherDistributionData;
}

// Function to calculate monthly temperature data
const calculateMonthlyData = (dailyData: HistoricalWeatherData["daily"]): MonthlyData => {
  const times = dailyData.time;
  const highestTemps = dailyData.temperature_2m_max.slice(0, 12);
  const lowestTemps = dailyData.temperature_2m_min.slice(0, 12);
    
  const uniqueYearMonths = new Set();

  times.forEach((date) => {
    const yearMonth = date.slice(0, 7);
    uniqueYearMonths.add(yearMonth);
  });

  // Convert organized data into arrays for Chart.js
  const labels = Array.from(uniqueYearMonths) as string[];

  return { labels, highestTemps, lowestTemps };
};

// Function to calculate weather distribution data
const calculateWeatherDistributionData = (
  dailyData: HistoricalWeatherData["daily"]
): WeatherDistributionData => {
   //Code 1: Clear sky
  //Code 3: Showers of rain      Code 55: Rain and snow mixed      Code 73: Thunderstorm with rain
  //Code 51: Drizzle      Code 61: Cloudy sky      Code 63: Overcast 
  const weatherDistribution: { [weather: string]: number } = {
    sunny: dailyData.weather_code.filter((code) => code === 0 || code === 1)
      .length,
    rainy: dailyData.weather_code.filter(
      (code) => code === 3 || code === 55 || code === 73
    ).length,
    cloudy: dailyData.weather_code.filter(
      (code) => code === 51 || code === 61 || code === 71
    ).length,
  };

  

  // Convert organized data into arrays for Chart.js
  const labels = Object.keys(weatherDistribution);
  const data = labels.map((weather) => weatherDistribution[weather]);

  return { labels, data };
};


export const formatChartData = (data: HistoricalWeatherData): FormattedData => {
  // Calculate temperature and weather distribution data
  const monthlyData = calculateMonthlyData(data.daily);
  const weatherDistributionData = calculateWeatherDistributionData(data.daily);

  return {
    monthly: monthlyData,
    weatherDistribution: weatherDistributionData,
  };
};