import CurrentLocation from "./CurrentLocation";
import CurrentWeather from "./CurrentWeather";
import Map from "./Map";
import HourlyForecast from "./HourlyForecast";
import DailyForecast from "./DailyForecast";
import HistoryPreview from "./HistoryPreview";

import "./HomePage.css";
import { Box, Container, Stack } from "@mui/material";
import { WmoCode } from "./WmoCode";

function HomePage() {
  return (
    <Container>
      <Box id="dashboard" display="grid" gap={2} padding={2}>
        <CurrentLocation id="current-location" />
        <CurrentWeather id="current-weather" />
        <Map id="map" />
        <HourlyForecast id="hourly-forecast" />
        <Stack id="daily-forecast" direction="row" gap={1}>
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
        <HistoryPreview id="history-preview" />
      </Box>
    </Container>
  );
}

export default HomePage;
