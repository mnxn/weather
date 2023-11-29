
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

      <Link to="/Maps" style={{ textDecoration: "none" }}>
        <Button
          variant="contained"
          color="primary"
          sx={{
            position: "absolute",
            bottom: "8px",
            right: "8px",
          }}
        >
          Go to MapsPage
        </Button>
      </Link>
    </Box>
  );
};

export default MapPreview;
