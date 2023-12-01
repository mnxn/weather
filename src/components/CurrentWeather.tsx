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

export default function CurrentWeather({
  time,
  weather,
  temperature,
  humidity,
  windSpeed,
  cloudCover,
  maxTemperature,
  minTemperature,
  units,
}: CurrentWeatherProps) {
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
          <Stack
            gap={1}
            alignItems="center"
            position="relative"
            top={10}
            right={15}
          >
            <Box className={`wi ${weatherIconClass(weather)}`} fontSize={50} />
            {/* Set height to 0 so it doesn't affect the stack height. */}
            <Box height={0}>{weatherDescription(weather)}</Box>
          </Stack>
        }
        title={`${temperature} °${units.temperature}`}
        subheader={`As of ${timeString}`}
      />
      <CardContent sx={{ paddingTop: 0 }}>
        <Stack gap={2}>
          <HighLowTemps high={maxTemperature} low={minTemperature} />
          <Chip label={`Humidity: ${humidity}%`} />
          <Chip label={`Wind Speed: ${windSpeed} m/s`} />
          <Chip label={`Cloud Cover: ${cloudCover}%`} />
        </Stack>
      </CardContent>
    </Card>
  );
}
