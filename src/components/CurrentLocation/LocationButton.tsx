import {
  LocationDisabled,
  LocationSearching,
  MyLocation,
} from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";
import { debounce } from "chart.js/helpers";
import {
  WeatherLocationProps,
  reverseWeatherLocation,
} from "../../WeatherLocation";
import { LocationState } from "./LocationState";

function getDevicePosition(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      // Infinity is the default value, but setting it explicitly seems to make
      // the position resolve more consistently in Firefox on Windows.
      maximumAge: Infinity,
      timeout: 5000,
    });
  });
}

export function LocationIcon(props: { state: LocationState }) {
  switch (props.state) {
    case LocationState.Ready:
      return <MyLocation />;
    case LocationState.Loading:
      return <LocationSearching />;
    case LocationState.Error:
      return <LocationDisabled />;
  }
}

export interface LocationButtonProps extends WeatherLocationProps {
  locationState: LocationState;
  setLocationState: (locationState: LocationState) => void;
}

export default function LocationButton({
  locationState,
  setLocationState,
  setWeatherLocation,
}: LocationButtonProps) {
  const fetchWeatherLocation = React.useMemo(
    () =>
      debounce(async () => {
        try {
          setLocationState(LocationState.Loading);
          const { coords } = await getDevicePosition();
          const reversedLocation = await reverseWeatherLocation(
            coords.latitude,
            coords.longitude
          );
          setWeatherLocation(reversedLocation);
          setLocationState(LocationState.Ready);
        } catch (e) {
          setLocationState(LocationState.Error);
          console.error(e);
        }
      }, 500),
    [setLocationState, setWeatherLocation]
  );

  return (
    <Button
      startIcon={<LocationIcon state={locationState} />}
      onClick={() => {
        fetchWeatherLocation();
      }}
    >
      Your Location
    </Button>
  );
}
