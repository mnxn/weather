import CurrentLocation from "./CurrentLocation";
import CurrentWeather from "./CurrentWeather";
import Map from "./Map";
import HourlyForecast from "./HourlyForecast";
import HistoryPreview from "./HistoryPreview";
import DailyForecast from "./DailyForecast";

function HomePage() {
  return (
    <div>
      <CurrentLocation />
      <CurrentWeather />
      <Map />
      <HourlyForecast />
      <DailyForecast />
      <DailyForecast />
      <DailyForecast />
      <DailyForecast />
      <DailyForecast />
      <DailyForecast />
      <DailyForecast />
      <HistoryPreview />
    </div>
  );
}

export default HomePage;
