import { HistoricalWeatherData } from "../../api/OpenMeteo";
import { WmoCode } from "../WmoCode";

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
export const calculateMonthlyData = (
  dailyData: HistoricalWeatherData["daily"],
): MonthlyData => {
  const times = dailyData.time;
  const highestTemps = dailyData.temperature_2m_max;
  const lowestTemps = dailyData.temperature_2m_min;

  // Create arrays to store monthly temperature data
  const labels: string[] = [];
  const monthlyHighestTemps: number[] = [];
  const monthlyLowestTemps: number[] = [];

  times.forEach((date, index) => {
    const yearMonth = date.slice(0, 7);

    // If the month doesn't exist in the arrays, initialize it
    if (!labels.includes(yearMonth)) {
      labels.push(yearMonth);
      monthlyHighestTemps.push(-Infinity);
      monthlyLowestTemps.push(Infinity);
    }

    // Update the highest and lowest temperatures for the month
    const monthIndex = labels.indexOf(yearMonth);
    monthlyHighestTemps[monthIndex] = Math.max(
      monthlyHighestTemps[monthIndex],
      highestTemps[index],
    );
    monthlyLowestTemps[monthIndex] = Math.min(
      monthlyLowestTemps[monthIndex],
      lowestTemps[index],
    );
  });

  return {
    labels,
    highestTemps: monthlyHighestTemps,
    lowestTemps: monthlyLowestTemps,
  };
};

// Function to calculate weather distribution data
export const calculateWeatherDistributionData = (
  dailyData: HistoricalWeatherData["daily"],
): WeatherDistributionData => {
  const weatherDistribution: Record<string, number> = {
    Sunny: dailyData.weather_code.filter(
      (code) => code === WmoCode.ClearSky || code === WmoCode.MainlyClear,
    ).length,
    Rainy: dailyData.weather_code.filter(
      (code) =>
        code === WmoCode.RainHeavy ||
        code === WmoCode.RainModerate ||
        code === WmoCode.RainShowersModerate ||
        code === WmoCode.RainShowersViolent ||
        code === WmoCode.RainShowersSlight ||
        code === WmoCode.RainSlight,
    ).length,
    Cloudy: dailyData.weather_code.filter(
      (code) =>
        code === WmoCode.DrizzleLight ||
        code === WmoCode.PartlyCloudy ||
        code === WmoCode.Overcast,
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
