import { useState } from "react";

import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Collapse,
  IconButton,
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
import LocationButton from "./LocationButton";
import { LocationState } from "./LocationState";
import SearchInput, { SearchRefProps } from "./SearchInput";

export interface LocationFocusProps extends SearchRefProps {
  locationExpanded: boolean;
  setLocationExpanded: (expanded: boolean) => void;
}

export interface CurrentLocationProps
  extends LocationFocusProps,
    WeatherLocationProps {
  collapsible?: boolean;
}

export default function CurrentLocation({
  collapsible = false,
  locationExpanded,
  setLocationExpanded,
  searchRef,
  weatherLocation,
  setWeatherLocation,
}: CurrentLocationProps) {
  const [locationState, setLocationState] = useState<LocationState>(
    LocationState.Ready,
  );

  return (
    <Card sx={{ height: "100%", position: "relative" }}>
      <CardHeader
        title={getLocationTitle(weatherLocation)}
        titleTypographyProps={{ component: "h2" }}
        subheader={weatherLocation.country}
        action={
          collapsible ? (
            <IconButton
              onClick={() => {
                setLocationExpanded(!locationExpanded);
              }}
              aria-label={
                locationExpanded
                  ? "Collapse Current Location Card"
                  : "Expand Current Location Card"
              }
            >
              {locationExpanded ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          ) : undefined
        }
      />

      <Collapse in={!collapsible || locationExpanded} timeout="auto">
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
      </Collapse>
      {locationState === LocationState.Loading && (
        // Set position to the bottom of the container.
        <Box position="absolute" bottom={0} width="100%">
          <LinearProgress />
        </Box>
      )}
    </Card>
  );
}
