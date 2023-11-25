import { Link, Routes, Route } from "react-router-dom";

import HomePage from "./components/HomePage";
import MapsPage from "./components/MapsPage/MapsPage";
import HistoryPage from "./components/HistoryPage";
import { AppBar, Button, Toolbar } from "@mui/material";
import { useState } from "react";
import { WeatherLocation } from "./WeatherLocation";

const center: WeatherLocation = { latitude: 45.5152, longitude: -122.676483 };

function App() {
  const [weatherLocation, setWeatherLocation] =
    useState<WeatherLocation>(center);

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
