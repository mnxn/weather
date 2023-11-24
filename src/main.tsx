import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import countries from "i18n-iso-countries";

import "weathericons/css/weather-icons.min.css";

countries.registerLocale(await import("i18n-iso-countries/langs/en.json"));

if (process.env.NODE_ENV !== "production") {
  const axe = await import("@axe-core/react");
  axe.default(React, ReactDOM, 1000);
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
  </React.StrictMode>
);
