import { LatLng } from "leaflet";
import "leaflet/dist/leaflet.css";
import React from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { Link } from "react-router-dom";

import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import { Box, IconButton, Paper, debounce } from "@mui/material";

import {
  WeatherLocationProps,
  reverseWeatherLocation,
} from "../../WeatherLocation";
import { InteractiveMap } from "../MapsPage/MapsPage";
import tileLayer from "./TileLayer";

export default function MapPreview({
  weatherLocation,
  setWeatherLocation,
}: WeatherLocationProps) {
  const center = new LatLng(
    weatherLocation.latitude,
    weatherLocation.longitude,
  );

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
    <Box
      position="relative"
      minHeight="200px"
      height="100%"
      width="100%"
      borderRadius={1}
      overflow="hidden"
      boxShadow={1}
    >
      <MapContainer
        style={{
          height: "100%",
          width: "100%",
          overflow: "hidden",
        }}
        center={center}
        zoom={10}
        scrollWheelZoom={false}
      >
        <TileLayer {...tileLayer} />
        <Marker position={center} />
        <InteractiveMap
          center={center}
          onMapClicked={(latLng: LatLng) => {
            void fetchWeatherLocation(latLng);
          }}
        />
      </MapContainer>

      <Box position="absolute" zIndex={999} bottom="8px" left="8px">
        <Paper sx={{ borderRadius: 5 }}>
          <IconButton
            LinkComponent={Link}
            href="/Maps"
            aria-label="Go to Maps Page"
            color="inherit"
          >
            <OpenInFullIcon />
          </IconButton>
        </Paper>
      </Box>
    </Box>
  );
}
