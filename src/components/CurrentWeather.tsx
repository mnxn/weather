import React from "react";

import { Box, Card, CardContent, CardHeader, Chip, Stack } from "@mui/material";

import HighLowTemps from "./HighLowTemps";
import { UnitProps } from "./UnitButton";
import { WmoCode, weatherDescription, weatherIconClass } from "./WmoCode";

interface CurrentWeatherProps extends UnitProps {
  time: string;
  weather: WmoCode;
  temperature: number;
  humidity: number;
  windSpeed: number;
  cloudCover: number;
  maxTemperature: number;
  minTemperature: number;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({
  time,
  weather,
  temperature,
  humidity,
  windSpeed,
  cloudCover,
  maxTemperature,
  minTemperature,
  units,
}) => {
  const timeString = new Date(time).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  return (
    <Card sx={{ height: "100%" }}>
      <CardHeader
        action={
          <Box
            className={`wi ${weatherIconClass(weather)}`}
            fontSize={50}
            paddingTop={1.5}
            paddingInline={1.5}
          />
        }
        title={`${temperature} °${units.temperature}`}
        subheader={`As of ${timeString}`}
      />
      <CardContent sx={{ paddingTop: 0 }}>
        <Stack gap={2}>
          <Stack direction="row" justifyContent="space-between">
            <HighLowTemps high={maxTemperature} low={minTemperature} />
            {weatherDescription(weather)}
          </Stack>
          <Chip label={`Humidity: ${humidity}%`} />
          <Chip label={`Wind Speed: ${windSpeed} m/s`} />
          <Chip label={`Cloud Cover: ${cloudCover}%`} />
        </Stack>
      </CardContent>
    </Card>
  );
};

export default CurrentWeather;
