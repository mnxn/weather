import CurrentLocation from "./CurrentLocation";
import CurrentWeather from "./CurrentWeather";
import Map from "./Map";
import HourlyForecast from "./HourlyForecast";
import DailyForecast from "./DailyForecast";
import HistoryPreview from "./HistoryPreview";

import "./HomePage.css";
import { Box, Container } from "@mui/material";

function HomePage() {
  return (
    <Container>
      <Box id="dashboard" display="grid" gap={2} padding={2} height={600}>
        <CurrentLocation id="current-location" />
        <CurrentWeather id="current-weather" />
        <Map id="map" />
        <HourlyForecast id="hourly-forecast" />
        <DailyForecast />
        <DailyForecast />
        <DailyForecast />
        <DailyForecast />
        <DailyForecast />
        <DailyForecast />
        <DailyForecast />
        <HistoryPreview id="history-preview" />
      </Box>
    </Container>
  );
}

export default HomePage;
