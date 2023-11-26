import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  LinearProgress,
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
import { useState } from "react";
import { LocationState } from "./LocationState";

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
  const [locationState, setLocationState] = useState<LocationState>(
    LocationState.Ready
  );

  return (
    <Card>
      <CardHeader
        title={getLocationTitle(weatherLocation)}
        subheader={weatherLocation.country}
      />
      <CardContent>
        <Stack gap={2}>
          <SearchInput
            weatherLocation={weatherLocation}
            setWeatherLocation={setWeatherLocation}
          />

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
        </Stack>
      </CardContent>
      <CardActions>
        <LocationButton
          weatherLocation={weatherLocation}
          setWeatherLocation={setWeatherLocation}
          locationState={locationState}
          setLocationState={setLocationState}
        />
      </CardActions>
      {locationState === LocationState.Loading && <LinearProgress />}
    </Card>
  );
}

export default CurrentLocation;
