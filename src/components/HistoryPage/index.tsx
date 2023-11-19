import { useEffect, useState } from "react";
import {
  SunsetData,
  fetchHistoricalWeatherData,
  fetchSunsetData,
} from "../../api/OpenMeteo";
import Box from "@mui/material/Box";
import { FormattedData, formatChartData } from "./CalcHistory";
import { PieChartContainer } from "./PieChart";
import { BarChartContainer } from "./BarChart";
import SunsetHistory from "./SunsetHistory";

// Generic function to return every Nth element of an array.
// Can be used to shrink a years worth of daily data to values every N days.
function everyNth<T>(array: T[] | undefined, n: number): T[] {
  if (array === undefined) {
    return [];
  }

  return array.filter((_, index) => index % n == 0);
}

const DAYS: number = 7;

const HistoryPage = () => {
  const [chartData, setChartData] = useState<FormattedData>({
    monthly: {
      labels: [],
      highestTemps: [],
      lowestTemps: [],
    },
    weatherDistribution: {
      labels: [],
      data: [],
    },
  });

  const [sunsetData, setSunsetData] = useState<SunsetData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const weatherData = await fetchHistoricalWeatherData(
        45.5152,
        -122.676483,
        2023
      );
      const formattedData = formatChartData(weatherData);
      setChartData(formattedData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchSunsetData(45.52345, -122.67621, 2022);
      setSunsetData(data);
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ p: 6 }}>
      <BarChartContainer
        title="Highest/lowest temperature"
        labels={chartData.monthly.labels}
        datasets={[
          {
            label: `Highest Temperature (°C)`,
            data: chartData.monthly.highestTemps,
            backgroundColor: "rgba(255, 99, 132, 0.5)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
          {
            label: `Lowest Temperature (°C)`,
            data: chartData.monthly.lowestTemps,
            backgroundColor: "rgba(54, 162, 235, 0.5)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
        ]}
      />
      <PieChartContainer
        title="Weather Distribution"
        labels={chartData.weatherDistribution.labels}
        data={chartData.weatherDistribution.data}
      />

      <SunsetHistory
        times={everyNth(sunsetData?.time, DAYS)}
        sunrise={everyNth(sunsetData?.sunrise, DAYS)}
        sunset={everyNth(sunsetData?.sunset, DAYS)}
      />
    </Box>
  );
};

export default HistoryPage;
