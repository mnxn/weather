import { HistoricalWeather } from "../../api/OpenWeather";

interface MonthlyData {
  labels: string[];
  highestTemps: number[];
  lowestTemps: number[];
}

interface DailyTempData {
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
  daily: DailyTempData;
  weatherDistribution: WeatherDistributionData;
}

// Function to calculate monthly temperature data
const calculateMonthlyData = (
  dailyData: HistoricalWeather["daily"]
): MonthlyData => {
  const monthlyData: { [month: string]: { highest: number; lowest: number } } =
    {};

  // Loop through each day's data
  dailyData.forEach((dayData) => {
    const date = new Date(dayData.dt * 1000);
    const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;

    // If the monthKey doesn't exist, initialize it
    if (!monthlyData[monthKey]) {
      monthlyData[monthKey] = {
        highest: Number.MIN_VALUE,
        lowest: Number.MAX_VALUE,
      };
    }

    // Get daily max and min temperatures
    const dailyMaxTemp = dayData.temp.max;
    const dailyMinTemp = dayData.temp.min;

    // Update monthlyData with the highest and lowest temperatures for the month
    monthlyData[monthKey].highest = Math.max(
      monthlyData[monthKey].highest,
      dailyMaxTemp
    );
    monthlyData[monthKey].lowest = Math.min(
      monthlyData[monthKey].lowest,
      dailyMinTemp
    );
  });

  // Convert organized data into arrays for Chart.js
  const labels = Object.keys(monthlyData);
  const highestTemps = labels.map((month) => monthlyData[month].highest);
  const lowestTemps = labels.map((month) => monthlyData[month].lowest);

  return { labels, highestTemps, lowestTemps };
};

// Function to calculate daily temperature data
const calculateDailyData = (
  dailyData: HistoricalWeather["daily"]
): DailyTempData => {
  const dailyDataObj: { [day: string]: { highest: number; lowest: number } } =
    {};

  // Loop through each day's data
  dailyData.forEach((dayData) => {
    const date = new Date(dayData.dt * 1000);
    const dayKey = date.toISOString().split("T")[0]; // Use ISO date as day key

    // If the dayKey doesn't exist, initialize it
    if (!dailyDataObj[dayKey]) {
      dailyDataObj[dayKey] = {
        highest: Number.MIN_VALUE,
        lowest: Number.MAX_VALUE,
      };
    }

    // Get daily max and min temperatures
    const dailyMaxTemp = dayData.temp.max;
    const dailyMinTemp = dayData.temp.min;

    // Update dailyDataObj with the highest and lowest temperatures for the day
    dailyDataObj[dayKey].highest = Math.max(
      dailyDataObj[dayKey].highest,
      dailyMaxTemp
    );
    dailyDataObj[dayKey].lowest = Math.min(
      dailyDataObj[dayKey].lowest,
      dailyMinTemp
    );
  });

  // Convert organized data into arrays for Chart.js
  const labels = Object.keys(dailyDataObj);
  const highestTemps = labels.map((day) => dailyDataObj[day].highest);
  const lowestTemps = labels.map((day) => dailyDataObj[day].lowest);

  return { labels, highestTemps, lowestTemps };
};

// Function to calculate weather distribution data
const calculateWeatherDistributionData = (
  dailyData: HistoricalWeather["daily"]
): WeatherDistributionData => {
  const weatherDistribution: { [weather: string]: number } = {
    clear: 0,
    rain: 0,
    clouds: 0,
  };

  dailyData.forEach((dayData) => {
    const weatherDescription = dayData.weather[0].main.toLowerCase();

    // Increment the count for the respective weather type
    if (
      Object.prototype.hasOwnProperty.call(
        weatherDistribution,
        weatherDescription
      )
    ) {
      weatherDistribution[weatherDescription]++;
    }
  });

  // Convert organized data into arrays for Chart.js
  const labels = Object.keys(weatherDistribution);
  const data = labels.map((weather) => weatherDistribution[weather]);

  return { labels, data };
};


export const formatChartData = (data: HistoricalWeather): FormattedData => {
  // Calculate temperature and weather distribution data
  const monthlyData = calculateMonthlyData(data.daily);
  const dailyData = calculateDailyData(data.daily);
  const weatherDistributionData = calculateWeatherDistributionData(data.daily);

  return {
    monthly: monthlyData,
    daily: dailyData,
    weatherDistribution: weatherDistributionData,
  };
};