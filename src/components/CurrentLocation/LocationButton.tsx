import {
  LocationDisabled,
  LocationSearching,
  MyLocation,
} from "@mui/icons-material";
import { Alert, Button, Popper } from "@mui/material";
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

function getLocationErrorMessage(e: unknown): string {
  if (e instanceof GeolocationPositionError) {
    switch (e.code) {
      case GeolocationPositionError.PERMISSION_DENIED:
        return "Location Permission Denied";

      case GeolocationPositionError.POSITION_UNAVAILABLE:
        return "Location Unavailable";

      case GeolocationPositionError.TIMEOUT:
        return "Location Timed Out";
    }
  }
  return "Unknown Location Error";
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
  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const [popperAnchor, setPopperAnchor] = React.useState<null | HTMLElement>(
    null
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
          console.error(e);
          setErrorMessage(getLocationErrorMessage(e));
          setLocationState(LocationState.Error);
        }
      }, 500),
    [setLocationState, setWeatherLocation]
  );

  return (
    <>
      <Button
        startIcon={<LocationIcon state={locationState} />}
        onClick={(event) => {
          if (popperAnchor === null) setPopperAnchor(event.currentTarget);
          fetchWeatherLocation();
        }}
      >
        Your Location
      </Button>
      <Popper
        open={locationState === LocationState.Error}
        anchorEl={popperAnchor}
        placement="bottom-start"
      >
        <Alert
          severity="error"
          onClose={() => setLocationState(LocationState.Ready)}
        >
          {errorMessage}
        </Alert>
      </Popper>
    </>
  );
}
