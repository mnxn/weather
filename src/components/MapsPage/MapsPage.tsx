import { LatLng } from "leaflet";
import "leaflet/dist/leaflet.css";
import React, { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";

import {
  Box,
  Container,
  Grid,
  ListItemText,
  Stack,
  Typography,
  debounce,
} from "@mui/material";

import {
  WeatherLocationProps,
  reverseWeatherLocation,
} from "../../WeatherLocation";
import {
  WeatherResponse,
  getWeatherByCity,
  getWeatherByCoordinates,
} from "../../api/WeatherApi";
import { useScreenSize } from "../../utils/useScreenSize";
import CurrentLocation, { LocationFocusProps } from "../CurrentLocation";
import { UnitProps } from "../UnitButton";
import tileLayer from "./TileLayer";

const cityNames = ["Chicago", "Portland", "New York", "Oregon", "Boston"];

export default function MapsPage({
  searchRef,
  locationExpanded,
  setLocationExpanded,
  units,
  setUnits,
  weatherLocation,
  setWeatherLocation,
}: LocationFocusProps & UnitProps & WeatherLocationProps) {
  const [locationWeatherData, setLocationWeatherData] =
    useState<WeatherResponse>();

  // Fetch weather data when the selected location changes
  useEffect(() => {
    async function fetchData() {
      const weatherByCity = await getWeatherByCoordinates(
        weatherLocation.latitude,
        weatherLocation.longitude,
      );

      setLocationWeatherData(weatherByCity);
    }

    void fetchData();
  }, [weatherLocation]);

  const fetchWeatherLocation = React.useMemo(
    () =>
      debounce(async (latLng: LatLng) => {
        const reversedLocation = await reverseWeatherLocation(
          latLng.lat,
          latLng.lng,
        );
        setWeatherLocation(reversedLocation);
      }, 500),
    [setWeatherLocation],
  );

  return (
    <Container sx={{ padding: 0 }}>
      <Stack gap={2} padding={{ xs: 1, md: 2 }}>
        <Grid container spacing={2} justifyItems="center">
          <Grid item xs={12} sm={6} md={8} alignSelf="center">
            <Typography
              height="100%"
              variant="h2"
              component="h1"
              textAlign="center"
            >
              Interactive Map
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CurrentLocation
              collapsible
              locationExpanded={locationExpanded}
              setLocationExpanded={setLocationExpanded}
              searchRef={searchRef}
              weatherLocation={weatherLocation}
              setWeatherLocation={setWeatherLocation}
            />
          </Grid>
        </Grid>

        <MapView
          center={
            new LatLng(weatherLocation.latitude, weatherLocation.longitude)
          }
          onMapClicked={(latLng: LatLng) => {
            void fetchWeatherLocation(latLng);
          }}
        />

        {locationWeatherData && (
          <LocationCondition
            data={locationWeatherData}
            units={units}
            setUnits={setUnits}
          />
        )}

        <MajorCitiesConditions units={units} setUnits={setUnits} />
      </Stack>
    </Container>
  );
}

interface MapViewProps {
  center: LatLng;
  onMapClicked: (latlng: LatLng) => void;
}

function MapView({ center, onMapClicked }: MapViewProps) {
  return (
    <Box
      sx={{
        height: "500px",
        width: "100%",
        zIndex: "0",
        overflow: "hidden",
        borderRadius: 1,
        boxShadow: 1,
      }}
    >
      <MapContainer
        style={{
          height: "100%",
          width: "100%",
          zIndex: "0",
          overflow: "hidden",
        }}
        center={center}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer {...tileLayer} />
        <Marker position={center} />
        <InteractiveMap center={center} onMapClicked={onMapClicked} />
      </MapContainer>
    </Box>
  );
}

export function InteractiveMap({ center, onMapClicked }: MapViewProps) {
  const map = useMap();

  useEffect(() => {
    // Move map view when the current location is changed.
    map.setView(center);
  }, [map, center]);

  useEffect(() => {
    // Listen for map clicks and invoke onMapClicked callback
    map.on("click", (e) => {
      onMapClicked(e.latlng);
    });
  }, [map, onMapClicked]);

  return null;
}

interface MajorCityBoxProps extends UnitProps {
  data?: WeatherResponse;
}

// Component to display weather information for a major city
function MajorCityBox({ data, units }: MajorCityBoxProps) {
  if (!data) {
    return <p>No data available</p>;
  }
  const { location, current } = data;

  return (
    <Box
      sx={{
        backgroundColor: "white",
        borderRadius: 1,
        boxShadow: 1,
        width: "100%",
        px: 3,
        py: 2,
      }}
    >
      <Typography variant="h6" component="h2" gutterBottom>
        {location?.name}
      </Typography>
      <img
        src={`https:${current?.condition?.icon}`}
        alt={`${current?.condition?.text} Weather Icon`}
        style={{ width: "64px", height: "64px" }}
      />
      <Typography>{current?.condition?.text}</Typography>
      <Typography>
        {units.temperature === "C" ? current?.temp_c : current?.temp_f}
        &deg;{units.temperature}
      </Typography>
    </Box>
  );
}

// Reusable function to render a ListItemText component with provided content
interface WeatherItemProps {
  primary: string;
  secondary: string;
}

function WeatherItem({ primary, secondary }: WeatherItemProps) {
  return (
    <ListItemText
      primary={primary}
      secondary={secondary}
      sx={{
        backgroundColor: "white",
        borderRadius: 1,
        boxShadow: 1,
        px: 3,
        py: 2,
        mb: 3,
      }}
    />
  );
}

interface LocationConditionProps extends UnitProps {
  data: WeatherResponse;
}

// Component to display weather conditions for the selected location
function LocationCondition({ data, units }: LocationConditionProps) {
  const { current } = data;
  const { isXMobileScreen } = useScreenSize();

  const temp = units.temperature === "C" ? current?.temp_c : current?.temp_f;

  return (
    <Stack direction={isXMobileScreen ? "column" : "row"} spacing={2}>
      <WeatherItem
        primary={`${temp ?? 0}°${units.temperature}`}
        secondary="Temperature"
      />
      <WeatherItem primary={`${current?.cloud}`} secondary="Clouds" />
      <WeatherItem primary={`${current?.humidity}`} secondary="Humidity" />
      <WeatherItem primary={`${current?.wind_kph} KM/H`} secondary="Wind" />
    </Stack>
  );
}

// Component to display weather conditions for major cities
function MajorCitiesConditions({ units, setUnits }: UnitProps) {
  const { isXMobileScreen } = useScreenSize();

  // State to store weather data for major cities
  const [weatherData, setWeatherData] = useState<
    Record<string, WeatherResponse | undefined>
  >({});

  useEffect(() => {
    async function fetchData() {
      const data: Record<string, WeatherResponse> = {};

      for (const city of cityNames) {
        const weatherByCity = await getWeatherByCity(city);
        data[city] = weatherByCity;
      }

      setWeatherData(data);
    }

    void fetchData();
  }, []);

  return (
    <Stack
      direction={isXMobileScreen ? "column" : "row"}
      spacing={2}
      sx={{ mb: 3, justifyContent: "center", width: "100%" }}
    >
      {cityNames.map((city) => (
        <Box key={city} sx={{ width: "100%" }}>
          {weatherData[city] && (
            <MajorCityBox
              data={weatherData[city]}
              units={units}
              setUnits={setUnits}
            />
          )}
        </Box>
      ))}
    </Stack>
  );
}
