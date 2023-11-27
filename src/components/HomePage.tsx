import { Box, Container, Stack } from "@mui/material";

import { WeatherLocationProps } from "../WeatherLocation";
import CurrentLocation from "./CurrentLocation";
import CurrentWeather from "./CurrentWeather";
import DailyForecast from "./DailyForecast";
import HistoryPreview from "./HistoryPreview";
import HourlyForecast from "./HourlyForecast";
import Map from "./Map";
import { WmoCode } from "./WmoCode";

function HomePage({
  weatherLocation,
  setWeatherLocation,
}: WeatherLocationProps) {
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

        <HourlyForecast
          times={["1", "2", "3", "4", "5", "6", "7"]}
          temperature={[20, 10, 30, 15, 25, 35, 30]}
          humidity={[90, 85, 60, 30, 40, 45, 70]}
          precipitation={[5, 20, 75, 90, 30, 60, 40]}
        />
        <Stack direction="row" gap={1}>
          <DailyForecast
            date={11}
            day="Sunday"
            weather={WmoCode.ClearSky}
            high={100}
            low={50}
          />
          <DailyForecast
            date={12}
            day="Monday"
            weather={WmoCode.RainHeavy}
            high={100}
            low={50}
          />
          <DailyForecast
            date={13}
            day="Tuesday"
            weather={WmoCode.SnowHeavy}
            high={100}
            low={50}
          />
          <DailyForecast
            date={14}
            day="Wednesday"
            weather={WmoCode.Fog}
            high={100}
            low={50}
          />
          <DailyForecast
            date={15}
            day="Thursday"
            weather={WmoCode.DrizzleDense}
            high={100}
            low={50}
          />
          <DailyForecast
            date={16}
            day="Friday"
            weather={WmoCode.ThunderstormHailHeavy}
            high={100}
            low={50}
          />
          <DailyForecast
            date={17}
            day="Saturday"
            weather={WmoCode.FreezingRainHeavy}
            high={100}
            low={50}
          />
        </Stack>
        <HistoryPreview />
      </Stack>
    </Container>
  );
}

export default HomePage;
