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
        <HourlyForecast
          id="hourly-forecast"
          times={["1", "2", "3", "4", "5", "6", "7"]}
          temperature={[20, 10, 30, 15, 25, 35, 30]}
          humidity={[90, 85, 60, 30, 40, 45, 70]}
          precipitation={[5, 20, 75, 90, 30, 60, 40]}
        />
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
