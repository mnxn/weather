import { Link, Routes, Route } from "react-router-dom";

import HomePage from "./components/HomePage";
import MapsPage from "./components/MapsPage/MapsPage";
import HistoryPage from "./components/HistoryPage/HistoryPage";
import { AppBar, Button, Toolbar } from "@mui/material";

function App() {
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
          <Route index element={<HomePage />} />
          <Route path="/maps" element={<MapsPage />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
