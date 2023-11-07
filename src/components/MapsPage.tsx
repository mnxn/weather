import { Box } from "@mui/material";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
import {LatLngExpression } from "leaflet";

import { useState } from "react";
import tileLayer from "./TileLayer";




function MapsPage() {
  const cities: { name: string; position: LatLngExpression }[] = [
    { name: "Portland", position: [45.5152, -122.676483] },
    { name: "City 2", position: [51.51, -0.1] },
    { name: "City 3", position: [51.515, -0.11] },
  ];

  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const center = { lat: 45.5152, lng: -122.676483 };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        backgroundColor: "white",
        padding: 3,
      }}
    >
      <MapContainer
        style={{
          height: "500px",
          width: "100%",
          zIndex: "0",
          border: "2px solid #333",
          overflow: "hidden",
        }}
        center={center}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer {...tileLayer} />

        {/* Display the list of cities with markers and popups */}
        {cities.map((city, index) => (
          <Marker
            key={index}
            position={city.position}
            eventHandlers={{
              click: () => setSelectedCity(city.name), // Set the selected city when clicked
            }}
          >
            <Popup>{city.name}</Popup>
          </Marker>
        ))}
        {/* Display the name of the selected city, if available */}
        {selectedCity && <p>Selected City: {selectedCity}</p>}
      </MapContainer>
    </Box>
  );
}

export default MapsPage;
