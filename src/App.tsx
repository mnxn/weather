import { Link, Routes, Route } from "react-router-dom";

import HomePage from "./components/HomePage";
import MapsPage from "./components/MapsPage";
import HistoryPage from "./components/HistoryPage";

function App() {
  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/maps">Maps</Link>
            </li>
            <li>
              <Link to="/history">Historical Data</Link>
            </li>
          </ul>
        </nav>
      </header>
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
