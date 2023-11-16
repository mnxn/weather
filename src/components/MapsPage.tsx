import {Box, ListItemText, Stack, Typography } from "@mui/material";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap
} from "react-leaflet";
import {LatLngExpression, LatLng } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";
import tileLayer from "./TileLayer";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";

import {
  WeatherResponse,
  getWeatherByCity,
  getWeatherByCoordinates
} from '../api/WeatherApi';



const MapView = ({
  onMapClicked,
}: {
  onMapClicked: (latlng: LatLng) => void;
}) => {
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
    <InteractiveMap onMapClicked={onMapClicked} />
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
    
const InteractiveMap = ({
  onMapClicked,
}: {
  onMapClicked: (latlng: LatLng) => void;
}) => {
  const map = useMap();

  useEffect(() => {
  if (!map) return;

  map.on("click", (e) => {
    const latlng = e.latlng;
    latlng && onMapClicked(latlng);
  });
}, [map]);

  return null;
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
        {location?.name}
      </Typography>
      <img
        src={`https:${current?.condition?.icon}`}
        alt={current?.condition?.text}
        style={{ width: "64px", height: "64px" }}
      />
      <Typography>
      Temperature: {current?.temp_c}°C ({current?.temp_f}°F))
      </Typography>
      <Typography>Condition: {current?.condition?.text}</Typography>
    </Box>
  );
};

const LocationBox = ({ data }: { data: WeatherResponse }) => {
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
        {location?.name}
      </Typography>
      <Typography>
        {location?.lat} , {location?.lon}
      </Typography>
      <Typography>{location?.country}</Typography>
      <Typography>{location?.region}</Typography>

      <Typography>{location?.localtime}</Typography>
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
          {weatherData[city] && <MajorCityBox data={weatherData[city]} />}
        </Box>
      ))}
    </Stack>
  );
};

function MapsPage() {
  const [selectedLocation, setSelectedLocation] = useState<LatLng | null>();
  const [locationWeatherData, setLocationWeatherData] =
    useState<WeatherResponse>();

  useEffect(() => {
    const fetchData = async () => {
      if (selectedLocation !== undefined) {
        const weatherByCity = await getWeatherByCoordinates(
          selectedLocation?.lat ?? 0,
          selectedLocation?.lng ?? 0
        );

        setLocationWeatherData(weatherByCity);
      }
    };

    fetchData();
  }, [selectedLocation]);

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
    {locationWeatherData && <LocationBox data={locationWeatherData} />}
      <MapView
        onMapClicked={(latLng: LatLng) => {
          setSelectedLocation(latLng);
      }}
    />

    <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
      <ListItemText
       primary={`${locationWeatherData?.current?.temp_c ?? 0}°C`}
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
        primary={locationWeatherData?.current?.cloud}
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
        primary={locationWeatherData?.current?.humidity}
        secondary="Humidity"
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
        primary={`${locationWeatherData?.current?.wind_kph} KM/H`}
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
