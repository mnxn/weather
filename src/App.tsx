import { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";

import { AppBar, Button, Toolbar } from "@mui/material";

import { WeatherLocation, defaultLocation } from "./WeatherLocation";
import HistoryPage from "./components/HistoryPage";
import HomePage from "./components/HomePage";
import MapsPage from "./components/MapsPage/MapsPage";

function App() {
  const [weatherLocation, setWeatherLocation] =
    useState<WeatherLocation>(defaultLocation);

  return (
    <>
      <AppBar position="static" sx={{ bgcolor: "#0f172a" }}>
        <Toolbar>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/maps">
            Maps
          </Button>
          <Button color="inherit" component={Link} to="/history">
            Historical Data
          </Button>
        </Toolbar>
      </AppBar>
      <main>
        <Routes>
          <Route
            index
            element={
              <HomePage
                weatherLocation={weatherLocation}
                setWeatherLocation={setWeatherLocation}
              />
            }
          />
          <Route
            path="/maps"
            element={
              <MapsPage
                weatherLocation={weatherLocation}
                setWeatherLocation={setWeatherLocation}
              />
            }
          />
          <Route
            path="/history"
            element={
              <HistoryPage
                weatherLocation={weatherLocation}
                setWeatherLocation={setWeatherLocation}
              />
            }
          />
        </Routes>
      </main>
    </>
  );
}

export default App;
