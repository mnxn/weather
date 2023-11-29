
import { Box, IconButton } from "@mui/material";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import tileLayer from "./TileLayer";
import { Link } from "react-router-dom";
import OpenInFullIcon from '@mui/icons-material/OpenInFull';

interface MapPreviewProps {
  center: { lat: number; lng: number };
}

const MapPreview = ({ center}: MapPreviewProps) => {
  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "200px",
        height: "100%", 
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
          left: "8px",
        }}
      >
        <Link to="/Maps" style={{ textDecoration: "none" }}>
        <IconButton 
            aria-label="Go to MapsPage"
            sx={{ bgcolor: "white", color: "black" }}>
            <OpenInFullIcon />
          </IconButton>
        </Link>
      </Box>
    </Box>

  );
};

export default MapPreview;
