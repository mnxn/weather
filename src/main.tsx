import { ThemeProvider } from "@emotion/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "weathericons/css/weather-icons.min.css";

import { createTheme } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

import App from "./App.tsx";
import "./index.css";

async function loadAxeCore() {
  const axe = await import("@axe-core/react");
  axe.default(React, ReactDOM, 1000);
}

if (process.env.NODE_ENV !== "production") {
  loadAxeCore();
}

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
});

ReactDOM.createRoot(document.getElementById("root")!).render(
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
