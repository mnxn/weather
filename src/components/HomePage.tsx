import CurrentLocation from "./CurrentLocation";
import CurrentWeather from "./CurrentWeather";
import Map from "./Map";
import HourlyForecast from "./HourlyForecast";
import DailyForecast from "./DailyForecast";
import HistoryPreview from "./HistoryPreview";

import "./HomePage.css";

function HomePage() {
  return (
    <div id="dashboard" className="container p-5 mx-auto grid gap-4 h-[600px]">
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
    </div>
  );
}

export default HomePage;
