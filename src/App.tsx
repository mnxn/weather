import { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";

import { AppBar, Button, Toolbar } from "@mui/material";
import { Box } from "@mui/system";

import { UnitButton, Units } from "./Units";
import { WeatherLocation, defaultLocation } from "./WeatherLocation";
import HistoryPage from "./components/HistoryPage";
import HomePage from "./components/HomePage";
import MapsPage from "./components/MapsPage/MapsPage";

function App() {
  const [units, setUnits] = useState<Units>({ temperature: "F" });
  const [weatherLocation, setWeatherLocation] =
    useState<WeatherLocation>(defaultLocation);

  return (
    <>
      <AppBar position="sticky" sx={{ bgcolor: "#0f172a" }}>
        <Toolbar>
          <Box flexGrow={1}>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/maps">
              Maps
            </Button>
            <Button color="inherit" component={Link} to="/history">
              History
            </Button>
          </Box>
          <UnitButton units={units} setUnits={setUnits} />
        </Toolbar>
      </AppBar>
      <main>
        <Routes>
          <Route
            index
            element={
              <HomePage
                units={units}
                setUnits={setUnits}
                weatherLocation={weatherLocation}
                setWeatherLocation={setWeatherLocation}
              />
            }
          />
          <Route
            path="/maps"
            element={
              <MapsPage
                units={units}
                setUnits={setUnits}
                weatherLocation={weatherLocation}
                setWeatherLocation={setWeatherLocation}
              />
            }
          />
          <Route
            path="/history"
            element={
              <HistoryPage
                units={units}
                setUnits={setUnits}
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
