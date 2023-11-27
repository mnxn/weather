import { useEffect, useState } from "react";

import { Container, Stack } from "@mui/material";

import { WeatherLocationProps } from "../../WeatherLocation";
import {
  SunsetData,
  fetchHistoricalWeatherData,
  fetchSunsetData,
} from "../../api/OpenMeteo";
import { BarChartContainer } from "./BarChart";
import { FormattedData, formatChartData } from "./CalcHistory";
import { PieChartContainer } from "./PieChart";
import SunsetHistory from "./SunsetHistory";

// Generic function to return every Nth element of an array.
// Can be used to shrink a years worth of daily data to values every N days.
function everyNth<T>(array: T[], n: number): T[] {
  return array.filter((_, index) => index % n == 0);
}

const DAYS = 7;

const HistoryPage = ({ weatherLocation }: WeatherLocationProps) => {
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

  const [sunsetData, setSunsetData] = useState<SunsetData>({
    time: [],
    sunrise: [],
    sunset: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const weatherData = await fetchHistoricalWeatherData(
        weatherLocation.latitude,
        weatherLocation.longitude,
        2023,
      );
      const formattedData = formatChartData(weatherData);
      setChartData(formattedData);
    };

    void fetchData();
  }, [weatherLocation]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchSunsetData(
        weatherLocation.latitude,
        weatherLocation.longitude,
        2022,
      );
      setSunsetData(data);
    };

    void fetchData();
  }, [weatherLocation]);

  return (
    <Container>
      <Stack gap={3} padding={2}>
        <BarChartContainer
          title="Highest/Lowest Temperature"
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
          timezone={weatherLocation.timeZone}
          times={everyNth(sunsetData.daily.time, DAYS)}
          sunrise={everyNth(sunsetData.daily.sunrise, DAYS)}
          sunset={everyNth(sunsetData.daily.sunset, DAYS)}
        />
      </Stack>
    </Container>
  );
};

export default HistoryPage;
