import {Box, ListItemText, Stack, Typography } from "@mui/material";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap
} from "react-leaflet";
import {LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";
import tileLayer from "./TileLayer";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";

import {
  WeatherResponse,
  getWeatherByCity,
} from '../api/WeatherApi';



const MapView = () => {
  const center = { lat: 45.5152, lng: -122.676483 };
  
  return (
    <MapContainer
      style={{
        height: "500px",
        width: "100%",
        zIndex: "0",
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        overflow: "hidden",
        marginBottom: "24px",
      }}
      center={center}
      zoom={13}
      scrollWheelZoom={false}
    >
    <TileLayer {...tileLayer} />
    <MyCities />
    </MapContainer>
    );
  };

const ShowCities = ({cities: cities}: {
  cities: { name: string; position: LatLngExpression }[];
    }) => {
      console.log("markerIconPng:", cities);
    
  return cities.map((marker, index) => {
    return (
      <Marker
        key={index}
        position={marker.position}
        icon={
          new Icon({
            iconUrl: markerIconPng,
            iconSize: [25, 41],
            iconAnchor: [12, 41],
          })
        }
      >
        <Popup>{marker.name}</Popup>
      </Marker>
    );
  });
};
    
const MyCities = () => {
  const map = useMap();
  const cityList: { name: string; position: LatLngExpression }[] = [
    { name: "Portland", position: [45.5152, -122.676483] },
    { name: "City 2", position: [51.51, -0.1] },
    { name: "City 3", position: [51.515, -0.11] },
  ];

  const [cities, setCities] =
  useState<{ name: string; position: LatLngExpression }[]>(cityList);

  useEffect(() => {
  if (!map) return;

  map.on("click", (e) => {
    const latlng = e.latlng;
    setCities((mar) => [...mar, { name: `${latlng}`, position: latlng }]);
  });
  }, [map]);

  return cities.length > 0 ? <ShowCities cities={cities} /> : null;
};

const cityNames = ["Chicago", "Portland", "New York", "Oregon", "Boston"];

const MajorCityBox = ({ data }: { data ?: WeatherResponse } ) => {
  if (!data) {
    return <p>No data available</p>;
  }
  const { location, current } = data;

  return (
    <Box
      sx={{
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        width: "fit-content",
        px: 3,
        py: 2,
        mb: 3,
      }}
    >
      <Typography variant="h6" gutterBottom>
        {location.name}
      </Typography>
      <img
        src={`https:${current.condition.icon}`}
        alt={current.condition.text}
        style={{ width: "64px", height: "64px" }}
      />
      <Typography>
        Temperature: {current.temp_c}°C ({current.temp_f}°F)
      </Typography>
      <Typography>Condition: {current.condition.text}</Typography>
    </Box>
  );
};

const MajorCitiesConditions = () => {
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
    <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
      {cityNames.map((city) => (
        <Box key={city}>
          <MajorCityBox data={weatherData[city]} />
        </Box>
      ))}
    </Stack>
  );
};

function MapsPage() {
  const [selectedCity] = useState<string | null>("Portland");

  return (
    <Stack
      sx={{
        height: "100vh",
        width: "100%",
        backgroundColor: "white",
        padding: 3,
      }}
      direction = "column"
    >
    <Typography
      sx={{
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        width: "fit-content",
        px: 3,
        py: 2,
        mb: 3,
      }}
    >
    </Typography>
    <MapView />

    <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
      <ListItemText
        primary={selectedCity}
        secondary="Temperature"
        sx={{
          border: "1px solid #e0e0e0",
          borderRadius: "8px",
          width: "fit-content",
          px: 3,
          py: 2,
          mb: 3,
        }}
        />

      <ListItemText
        primary={selectedCity}
        secondary="Clouds"
        sx={{
          border: "1px solid #e0e0e0",
          borderRadius: "8px",
          width: "fit-content",
          px: 3,
          py: 2,
          mb: 3,
        }}
      />
      <ListItemText
        primary={selectedCity}
        secondary="Precipitation"
        sx={{
          border: "1px solid #e0e0e0",
          borderRadius: "8px",
          width: "fit-content",
          px: 3,
          py: 2,
          mb: 3,
        }}
      />
      <ListItemText
        primary={selectedCity}
        secondary="Wind"
        sx={{
          border: "1px solid #e0e0e0",
          borderRadius: "8px",
          width: "fit-content",
          px: 3,
          py: 2,
          mb: 3,
        }}
      />
    </Stack>

    <MajorCitiesConditions />
  </Stack>
    );
}

export default MapsPage;
