import { Link, Routes, Route } from "react-router-dom";

import HomePage from "./components/HomePage";
import MapsPage from "./components/MapsPage";
import HistoryPage from "./components/HistoryPage";

function App() {
  return (
    <>
      <header className="bg-slate-900">
        <nav>
          <ul>
            <Link className="text-white hover:text-cyan-400" to="/">
              <li className="inline-block p-4">Home</li>
            </Link>{" "}
            <Link className="text-white hover:text-cyan-400" to="/maps">
              <li className="inline-block p-4">Maps</li>
            </Link>
            <Link className="text-white hover:text-cyan-400" to="/history">
              <li className="inline-block p-4">Historical Data</li>{" "}
            </Link>
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
