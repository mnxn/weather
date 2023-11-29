
import { Box, Button } from "@mui/material";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import tileLayer from "./TileLayer";
import { Link } from "react-router-dom";

interface MapPreviewProps {
  center: { lat: number; lng: number };
}

const MapPreview = ({ center}: MapPreviewProps) => {
  return (
    <Box
      sx={{
        position: "relative",
        height: "200px", 
        width: "100%",
        borderRadius: "8px",
        overflow: "hidden",
        marginBottom: "16px", 
      }}
    >
      <MapContainer
        style={{
          height: "100%",
          width: "100%",
          overflow: "hidden",
        }}
        center={[center.lat, center.lng]}
        zoom={10} 
        scrollWheelZoom={false}
      >
      <TileLayer {...tileLayer} />
      </MapContainer>

      <Box
        sx={{
          position: "absolute",
          zIndex: 999,
          bottom: "8px",
          right: "8px",
        }}
      >
        <Link to="/Maps" style={{ textDecoration: "none" }}>
          <Button variant="contained" color="primary">
            Go to MapsPage
          </Button>
        </Link>
      </Box>
    </Box>

  );
};

export default MapPreview;
