import { useRef, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";

import { AppBar, Button, Toolbar } from "@mui/material";

import { WeatherLocation, defaultLocation } from "./WeatherLocation";
import HistoryPage from "./components/HistoryPage";
import HomePage from "./components/HomePage";
import { LocationJumpButton } from "./components/LocationJumpButton";
import MapsPage from "./components/MapsPage/MapsPage";
import { UnitButton, Units } from "./components/UnitButton";

function App() {
  const [units, setUnits] = useState<Units>({ temperature: "F" });
  const [weatherLocation, setWeatherLocation] =
    useState<WeatherLocation>(defaultLocation);

  const [locationExpanded, setLocationExpanded] = useState<boolean>(false);
  const searchRef = useRef<HTMLInputElement | null>(null);

  return (
    <>
      <AppBar position="sticky" sx={{ bgcolor: "#0f172a" }}>
        <Toolbar>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/maps">
            Maps
          </Button>
          <Button color="inherit" component={Link} to="/history">
            History
          </Button>
          <LocationJumpButton
            searchRef={searchRef}
            locationExpanded={locationExpanded}
            setLocationExpanded={setLocationExpanded}
            weatherLocation={weatherLocation}
            setWeatherLocation={setWeatherLocation}
          />
          <UnitButton units={units} setUnits={setUnits} />
        </Toolbar>
      </AppBar>
      <main>
        <Routes>
          <Route
            index
            element={
              <HomePage
                searchRef={searchRef}
                locationExpanded={locationExpanded}
                setLocationExpanded={setLocationExpanded}
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
                searchRef={searchRef}
                locationExpanded={locationExpanded}
                setLocationExpanded={setLocationExpanded}
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
                searchRef={searchRef}
                locationExpanded={locationExpanded}
                setLocationExpanded={setLocationExpanded}
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
