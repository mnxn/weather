import { useEffect, useState } from "react";

import { Container, Grid, Stack, Typography } from "@mui/material";

import { WeatherLocationProps } from "../../WeatherLocation";
import {
  SunsetData,
  fetchHistoricalWeatherData,
  fetchSunsetData,
} from "../../api/OpenMeteo";
import CurrentLocation, { LocationFocusProps } from "../CurrentLocation";
import { UnitProps } from "../UnitButton";
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

const HistoryPage = ({
  searchRef,
  locationExpanded,
  setLocationExpanded,
  units,
  weatherLocation,
  setWeatherLocation,
}: LocationFocusProps & UnitProps & WeatherLocationProps) => {
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
    daily: {
      time: [],
      sunrise: [],
      sunset: [],
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      const weatherData = await fetchHistoricalWeatherData(
        units.temperature === "C" ? "celsius" : "fahrenheit",
        weatherLocation.latitude,
        weatherLocation.longitude,
        2023,
      );
      const formattedData = formatChartData(weatherData);
      setChartData(formattedData);
    };

    void fetchData();
  }, [weatherLocation.latitude, weatherLocation.longitude, units.temperature]);

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
  }, [weatherLocation.latitude, weatherLocation.longitude]);

  return (
    <Container sx={{ padding: 0 }}>
      <Stack gap={2} padding={{ xs: 1, md: 2 }}>
        <Grid container spacing={2} justifyItems="center">
          <Grid item xs={12} sm={6} md={8} alignSelf="center">
            <Typography
              height="100%"
              variant="h2"
              component="h1"
              textAlign="center"
            >
              Historical Data
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CurrentLocation
              collapsible
              locationExpanded={locationExpanded}
              setLocationExpanded={setLocationExpanded}
              searchRef={searchRef}
              weatherLocation={weatherLocation}
              setWeatherLocation={setWeatherLocation}
            />
          </Grid>
        </Grid>

        <BarChartContainer
          title="Highest/Lowest Temperature"
          labels={chartData.monthly.labels}
          datasets={[
            {
              label: `Highest Temperature (°${units.temperature})`,
              data: chartData.monthly.highestTemps,
              backgroundColor: "rgba(255, 99, 132, 0.5)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
            },
            {
              label: `Lowest Temperature (°${units.temperature})`,
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
