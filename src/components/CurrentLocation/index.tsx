import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Stack,
  Tooltip,
} from "@mui/material";
import {
  WeatherLocation,
  WeatherLocationProps,
  formatLatitude,
  formatElevation,
  formatLongitude,
} from "../../WeatherLocation";
import SearchInput from "./SearchInput";
import LocationButton from "./LocationButton";

function getLocationTitle({ city, state }: WeatherLocation): string {
  if (city && state) {
    return `${city}, ${state}`;
  } else if (city) {
    return city;
  } else if (state) {
    return state;
  }
  return "Unknown Location";
}

function CurrentLocation({
  weatherLocation,
  setWeatherLocation,
}: WeatherLocationProps) {
  return (
    <Card>
      <CardHeader
        title={getLocationTitle(weatherLocation)}
        subheader={weatherLocation.country}
      />
      <CardContent>
        <Stack gap={2}>
          <Stack direction="row" gap={1}>
            <Tooltip title="Latitude">
              <Chip label={formatLatitude(weatherLocation.latitude)} />
            </Tooltip>

            <Tooltip title="Longitude">
              <Chip label={formatLongitude(weatherLocation.longitude)} />
            </Tooltip>

            {weatherLocation.elevation !== undefined && (
              <Tooltip title="Elevation">
                <Chip label={formatElevation(weatherLocation.elevation)} />
              </Tooltip>
            )}
          </Stack>

          <SearchInput
            weatherLocation={weatherLocation}
            setWeatherLocation={setWeatherLocation}
          />
        </Stack>
      </CardContent>
      <CardActions>
        <LocationButton
          weatherLocation={weatherLocation}
          setWeatherLocation={setWeatherLocation}
        />
      </CardActions>
    </Card>
  );
}

export default CurrentLocation;
