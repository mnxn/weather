import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, Chip, Stack } from "@mui/material";
import { fetchCombinedData, CombinedData } from "../../api/OpenMeteo";
import { WeatherLocationProps } from "../../WeatherLocation";

interface WeatherBoxProps extends WeatherLocationProps {}

const WeatherBox: React.FC<WeatherBoxProps> = ({ weatherLocation, setWeatherLocation }) => {
  const [weatherData, setWeatherData] = useState<CombinedData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCombinedData(
          weatherLocation.latitude,
          weatherLocation.longitude
        );
        setWeatherData(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchData();
  }, [weatherLocation.latitude, weatherLocation.longitude]);

  return (
    <Card>
      {weatherData && (
        <>
          <CardHeader
            title={`${weatherData.current.temperature_2m}°C`}
            subheader={`Current Weather in ${weatherLocation.city}, ${weatherLocation.state}`}
          />
          <CardContent>
            <Stack gap={2}>
              <Chip label={`${new Date(weatherData.current.time).toLocaleString()}`} />
              <Chip label={`Humidity: ${weatherData.current.relative_humidity_2m}%`} />
              <Chip label={`wind: ${weatherData.current.wind_speed_10m}`} />
            </Stack>
          </CardContent>
        </>
      )}
    </Card>
  );
};

export default WeatherBox;
