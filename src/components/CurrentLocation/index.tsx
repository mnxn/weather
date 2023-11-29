import { useState } from "react";

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
  WeatherLocationProps,
  formatElevation,
  formatLatitude,
  formatLongitude,
  getLocationTitle,
} from "../../WeatherLocation";
import { SearchRefProps } from "../LocationJumpButton";
import LocationButton from "./LocationButton";
import { LocationState } from "./LocationState";
import SearchInput from "./SearchInput";

function CurrentLocation({
  searchRef,
  weatherLocation,
  setWeatherLocation,
}: SearchRefProps & WeatherLocationProps) {
  const [locationState, setLocationState] = useState<LocationState>(
    LocationState.Ready,
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
            searchRef={searchRef}
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
              <Tooltip title="Elevation (meters)">
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
