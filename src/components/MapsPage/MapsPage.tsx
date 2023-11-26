import { LatLng } from "leaflet";
import "leaflet/dist/leaflet.css";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";

import { Box, ListItemText, Stack, Typography, debounce } from "@mui/material";

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
import tileLayer from "./TileLayer";

const cityNames = ["Chicago", "Portland", "New York", "Oregon", "Boston"];

function MapsPage({
  weatherLocation,
  setWeatherLocation,
}: WeatherLocationProps) {
  const [locationWeatherData, setLocationWeatherData] =
    useState<WeatherResponse>();

  // Fetch weather data when the selected location changes
  useEffect(() => {
    const fetchData = async () => {
      const weatherByCity = await getWeatherByCoordinates(
        weatherLocation.latitude,
        weatherLocation.longitude,
      );

      setLocationWeatherData(weatherByCity);
    };

    fetchData();
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
    <Stack
      sx={{
        padding: 6,
      }}
      direction="column"
    >
      {locationWeatherData && <LocationBox data={locationWeatherData} />}
      <MapView
        center={new LatLng(weatherLocation.latitude, weatherLocation.longitude)}
        onMapClicked={(latLng: LatLng) => {
          fetchWeatherLocation(latLng);
        }}
      />

      {locationWeatherData && <LocationCondition data={locationWeatherData} />}

      <MajorCitiesConditions />
    </Stack>
  );
}

interface MapViewProps {
  center: LatLng;
  onMapClicked: (latlng: LatLng) => void;
}

const MapView = ({ center, onMapClicked }: MapViewProps) => {
  return (
    <Box
      sx={{
        height: "500px",
        width: "100%",
        zIndex: "0",
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        overflow: "hidden",
        marginBottom: "24px",
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
        <InteractiveMap onMapClicked={onMapClicked} />
      </MapContainer>
    </Box>
  );
};

const InteractiveMap = ({
  onMapClicked,
}: {
  onMapClicked: (latlng: LatLng) => void;
}) => {
  const map = useMap();

  useEffect(() => {
    // Listen for map clicks and invoke onMapClicked callback
    map?.on("click", (e) => {
      const latlng = e.latlng;
      if (latlng) onMapClicked(latlng);
    });
  }, [map, onMapClicked]);

  return null;
};

// Component to display weather information for a major city
const MajorCityBox = ({ data }: { data?: WeatherResponse }) => {
  if (!data) {
    return <p>No data available</p>;
  }
  const { location, current } = data;

  return (
    <Box
      sx={{
        backgroundColor: "white",
        borderRadius: 2,
        width: "100%",
        px: 3,
        py: 2,
        mb: 3,
      }}
    >
      <Typography variant="h6" gutterBottom>
        {location?.name}
      </Typography>
      <img
        src={`https:${current?.condition?.icon}`}
        alt={current?.condition?.text}
        style={{ width: "64px", height: "64px" }}
      />
      <Typography>{current?.condition?.text}</Typography>
      <Typography>
        {current?.temp_c}°C ({current?.temp_f}°F)
      </Typography>
    </Box>
  );
};

// Reusable function to render a ListItemText component with provided content
interface WeatherItemProps {
  primary: string;
  secondary: string;
}
const WeatherItem: React.FC<WeatherItemProps> = ({ primary, secondary }) => (
  <ListItemText
    primary={primary}
    secondary={secondary}
    sx={{
      backgroundColor: "white",
      borderRadius: 2,
      px: 3,
      py: 2,
      mb: 3,
    }}
  />
);

// Component to display weather conditions for the selected location
const LocationCondition = ({ data }: { data: WeatherResponse }) => {
  const { current } = data;
  const { isXMobileScreen } = useScreenSize();

  return (
    <Stack
      direction={isXMobileScreen ? "column" : "row"}
      spacing={2}
      sx={{ mb: 3 }}
    >
      <WeatherItem
        primary={`${current?.temp_c ?? 0}°C`}
        secondary="Temperature"
      />
      <WeatherItem primary={`${current?.cloud}`} secondary="Clouds" />
      <WeatherItem primary={`${current?.humidity}`} secondary="Humidity" />
      <WeatherItem primary={`${current?.wind_kph} KM/H`} secondary="Wind" />
    </Stack>
  );
};

// Component to display location details for the selected location
const LocationBox = ({ data }: { data: WeatherResponse }) => {
  const { location } = data;

  return (
    <Box
      sx={{
        backgroundColor: "white",
        borderRadius: 2,
        width: "fit-content",
        px: 3,
        py: 2,
        mb: 3,
      }}
    >
      <Typography variant="h6" gutterBottom>
        {location?.name}
      </Typography>
      <Typography>{location?.localtime}</Typography>
      <Typography>{location?.country}</Typography>
      <Typography>{location?.region}</Typography>
      <Typography>
        {location?.lat} , {location?.lon}
      </Typography>
    </Box>
  );
};

// Component to display weather conditions for major cities
const MajorCitiesConditions = () => {
  const { isXMobileScreen } = useScreenSize();

  // State to store weather data for major cities
  const [weatherData, setWeatherData] = useState<{
    [key: string]: WeatherResponse;
  }>({});

  useEffect(() => {
    const fetchData = async () => {
      const data: { [key: string]: WeatherResponse } = {};

      for (const city of cityNames) {
        const weatherByCity = await getWeatherByCity(city);
        data[city] = weatherByCity;
      }

      setWeatherData(data);
    };

    fetchData();
  }, []);

  return (
    <Stack
      direction={isXMobileScreen ? "column" : "row"}
      spacing={2}
      sx={{ mb: 3, justifyContent: "center", width: "100%" }}
    >
      {cityNames.map((city) => (
        <Box key={city} sx={{ width: "100%" }}>
          {weatherData[city] && <MajorCityBox data={weatherData[city]} />}
        </Box>
      ))}
    </Stack>
  );
};

export default MapsPage;
