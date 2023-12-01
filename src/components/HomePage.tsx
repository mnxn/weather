import { useEffect, useState } from "react";

import { Container, Grid, Skeleton, Stack, Typography } from "@mui/material";

import { WeatherLocationProps } from "../WeatherLocation";
import { CombinedData, fetchCombinedData } from "../api/OpenMeteo";
import CurrentLocation, { LocationFocusProps } from "./CurrentLocation";
import CurrentWeather from "./CurrentWeather";
import DailyForecast from "./DailyForecast";
import HourlyForecast from "./HourlyForecast";
import MapPreview from "./MapPreview";
import { UnitProps } from "./UnitButton";

const FUTURE_FORECAST_DAYS = 6;

function HomePage({
  searchRef,
  locationExpanded,
  setLocationExpanded,
  units,
  setUnits,
  weatherLocation,
  setWeatherLocation,
}: LocationFocusProps & UnitProps & WeatherLocationProps) {
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
      <Typography
        variant="h2"
        component="h1"
        textAlign="center"
        marginBlock={3}
      >
        Weather Dashboard
      </Typography>
      <Stack
        gap={2}
        paddingInline={{ xs: 1, md: 2 }}
        marginBottom={{ xs: 1, md: 2 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <CurrentLocation
              searchRef={searchRef}
              locationExpanded={locationExpanded}
              setLocationExpanded={setLocationExpanded}
              weatherLocation={weatherLocation}
              setWeatherLocation={setWeatherLocation}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            {combinedData === null ? (
              <Skeleton variant="rounded" height={280} />
            ) : (
              <CurrentWeather
                time={combinedData.current.time}
                weather={combinedData.current.weather_code}
                temperature={combinedData.current.temperature_2m}
                humidity={combinedData.current.relative_humidity_2m}
                windSpeed={combinedData.current.wind_speed_10m}
                cloudCover={combinedData.current.cloud_cover}
                maxTemperature={combinedData.daily.temperature_2m_max[0]}
                minTemperature={combinedData.daily.temperature_2m_min[0]}
                units={units}
                setUnits={setUnits}
              />
            )}
          </Grid>

          <Grid item xs={12} md={4}>
            <MapPreview
              weatherLocation={weatherLocation}
              setWeatherLocation={setWeatherLocation}
            />
          </Grid>
        </Grid>

        {combinedData === null ? (
          <Skeleton variant="rounded" height={380} />
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
                <Skeleton variant="rounded" height={225} />
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
      </Stack>
    </Container>
  );
}

export default HomePage;
