import React from "react";
import { Card, CardContent, CardHeader, Chip, Stack } from "@mui/material";

interface CurrentWeatherProps {
  time: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  maxTemperature: number;
  minTemperature: number;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ time, temperature, humidity, windSpeed, maxTemperature, minTemperature}) => {
  return (
    <Card>
      <CardHeader
        title={`Current Temperature: ${temperature}°C`}
        subheader={`As of ${time}`}
      />
      <CardContent>
        <Stack gap={2}>
          <Chip label={`Max Temperature: ${maxTemperature}`} />
          <Chip label={`Min Temperature: ${minTemperature}`} />
          <Chip label={`Humidity: ${humidity}%`} />
          <Chip label={`Wind Speed: ${windSpeed} m/s`} />
        </Stack>
      </CardContent>
    </Card>
  );
};

export default CurrentWeather;
