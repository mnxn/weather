import { useEffect, useState } from "react";

import { Box, Container, Skeleton, Stack } from "@mui/material";

import { WeatherLocationProps } from "../WeatherLocation";
import { CombinedData, fetchCombinedData } from "../api/OpenMeteo";
import CurrentLocation from "./CurrentLocation";
import CurrentWeather from "./CurrentWeather";
import DailyForecast from "./DailyForecast";
import HistoryPreview from "./HistoryPreview";
import HourlyForecast from "./HourlyForecast";
import Map from "./Map";

function HomePage({
  weatherLocation,
  setWeatherLocation,
}: WeatherLocationProps) {
  const [combinedData, setCombinedData] = useState<CombinedData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCombinedData(
        weatherLocation.latitude,
        weatherLocation.longitude,
      );
      setCombinedData(data);
    };

    void fetchData();
  }, [weatherLocation]);

  return (
    <Container>
      <Stack gap={2} padding={2}>
        <Stack direction="row" gap={2}>
          <Box flex={1}>
            <CurrentLocation
              weatherLocation={weatherLocation}
              setWeatherLocation={setWeatherLocation}
            />
          </Box>
          <Box flex={1}>
            <CurrentWeather />
          </Box>
          <Box flex={1}>
            <Map />
          </Box>
        </Stack>

        {combinedData ? (
          <HourlyForecast
            times={combinedData.hourly.time}
            temperature={combinedData.hourly.temperature_2m}
            humidity={combinedData.hourly.relative_humidity_2m}
            precipitation={combinedData.hourly.precipitation_probability}
          />
        ) : (
          <Skeleton variant="rectangular" height={400} />
        )}

        <Stack direction="row" gap={1}>
          {combinedData
            ? combinedData.daily.time.map((time, index) => (
                <DailyForecast
                  key={time}
                  date={time}
                  weather={combinedData.daily.weather_code[index]}
                  high={combinedData.daily.temperature_2m_max[index]}
                  low={combinedData.daily.temperature_2m_min[index]}
                />
              ))
            : Array.from({ length: 7 }, (_, index) => (
                <Skeleton
                  key={index}
                  variant="rectangular"
                  height={225}
                  sx={{ flex: 1 }}
                />
              ))}
        </Stack>
        <HistoryPreview />
      </Stack>
    </Container>
  );
}

export default HomePage;
