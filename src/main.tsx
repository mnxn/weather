import { ThemeProvider } from "@emotion/react";
import L from "leaflet";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "weathericons/css/weather-icons.min.css";

import { createTheme } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import App from "./App.tsx";
import "./index.css";

async function loadAxeCore() {
  const axe = await import("@axe-core/react");
  await axe.default(React, ReactDOM, 5000);
}

if (!import.meta.env.PROD) {
  void loadAxeCore();
}

// Leaflet Marker icons need to be set explicitly or they will 404 in production.
// The integer values are from https://stackoverflow.com/a/51232969
// They are necessary for the marker to be placed properly on the map.
L.Marker.prototype.setIcon(
  L.icon({
    iconRetinaUrl,
    iconUrl,
    shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41],
  }),
);

const theme = createTheme({
  palette: {
    background: {
      default: "#94a3b8",
    },
  },
  typography: {
    button: {
      textTransform: "none",
    },
  },
  components: {
    MuiSkeleton: {
      defaultProps: {
        sx: {
          boxShadow: 1,
        },
      },
    },
  },
});

const root = document.getElementById("root");
if (root !== null) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline>
            <App />
          </CssBaseline>
        </ThemeProvider>
      </BrowserRouter>
    </React.StrictMode>,
  );
} else {
  console.error("root element is missing");
}
