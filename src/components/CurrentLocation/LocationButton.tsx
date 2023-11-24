import {
  LocationDisabled,
  LocationSearching,
  MyLocation,
} from "@mui/icons-material";
import { Button } from "@mui/material";
import React, { useState } from "react";
import { debounce } from "chart.js/helpers";
import {
  WeatherLocationProps,
  reverseWeatherLocation,
} from "../../WeatherLocation";

function getDevicePosition(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      timeout: 5000,
    });
  });
}

enum LocationState {
  Ready,
  Loading,
  Error,
}

function LocationIcon(props: { state: LocationState }) {
  switch (props.state) {
    case LocationState.Ready:
      return <MyLocation />;
    case LocationState.Loading:
      return <LocationSearching />;
    case LocationState.Error:
      return <LocationDisabled />;
  }
}

export default function LocationButton({
  setWeatherLocation,
}: WeatherLocationProps) {
  const [locationState, setLocationState] = useState<LocationState>(
    LocationState.Ready
  );

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
    [setWeatherLocation]
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
