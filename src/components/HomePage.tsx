import { useEffect, useState } from "react";

import { Container, Grid, Skeleton, Stack } from "@mui/material";

import { WeatherLocationProps } from "../WeatherLocation";
import { CombinedData, fetchCombinedData } from "../api/OpenMeteo";
import CurrentLocation from "./CurrentLocation";
import CurrentWeather from "./CurrentWeather";
import DailyForecast from "./DailyForecast";
import HistoryPreview from "./HistoryPreview";
import HourlyForecast from "./HourlyForecast";
import { SearchRefProps } from "./LocationJumpButton";
import Map from "./Map";
import { UnitProps } from "./UnitButton";

const FUTURE_FORECAST_DAYS = 6;

function HomePage({
  searchRef,
  units,
  weatherLocation,
  setWeatherLocation,
}: SearchRefProps & UnitProps & WeatherLocationProps) {
  const [combinedData, setCombinedData] = useState<CombinedData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCombinedData(
        units.temperature === "C" ? "celsius" : "fahrenheit",
        weatherLocation.latitude,
        weatherLocation.longitude,
        // Open-Meteo includes the current day in the forecast.
        FUTURE_FORECAST_DAYS + 1,
      );

      setCombinedData(data);
    };

    void fetchData();
  }, [weatherLocation.latitude, weatherLocation.longitude, units.temperature]);


  return (
    <Container sx={{ padding: 0 }}>
      <Stack gap={2} padding={{ xs: 1, sm: 1, md: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <CurrentLocation
              searchRef={searchRef}
              weatherLocation={weatherLocation}
              setWeatherLocation={setWeatherLocation}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
          <CurrentWeather
            time={combinedData?.current.time || ""}
            temperature={combinedData?.current.temperature_2m || 0}
            humidity={combinedData?.current.relative_humidity_2m || 0}
            windSpeed={combinedData?.current.wind_speed_10m || 0}
            maxTemperature={combinedData?.daily.temperature_2m_max[0] || 0}
            minTemperature={combinedData?.daily.temperature_2m_min[0] || 0}
          />
        </Grid>

          <Grid item xs={12} md={4}>
            <Map />
          </Grid>
        </Grid>

        {combinedData === null ? (
          <Skeleton variant="rectangular" height={380} />
        ) : (
          <HourlyForecast
            times={combinedData.hourly.time}
            temperature={combinedData.hourly.temperature_2m}
            humidity={combinedData.hourly.relative_humidity_2m}
            precipitation={combinedData.hourly.precipitation_probability}
          />
        )}

        <Grid container spacing={1}>
          {Array.from({ length: FUTURE_FORECAST_DAYS }, (_, index) => (
            <Grid item key={index} xs={6} sm={4} md={2}>
              {combinedData === null ? (
                <Skeleton variant="rectangular" height={225} />
              ) : (
                // Skip current day since the current weather component
                // already shows the same information.
                <DailyForecast
                  date={combinedData.daily.time[index + 1]}
                  weather={combinedData.daily.weather_code[index + 1]}
                  high={combinedData.daily.temperature_2m_max[index + 1]}
                  low={combinedData.daily.temperature_2m_min[index + 1]}
                />
              )}
            </Grid>
          ))}
        </Grid>
        <HistoryPreview />
      </Stack>
    </Container>
  );
}

export default HomePage;