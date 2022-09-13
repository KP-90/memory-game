import ReactDOM from "react-dom/client";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
// import your route components too
import App from "./App"
import Infinite from "./infinite/infinite"

const root = ReactDOM.createRoot(
  document.getElementById("root")
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/memory-game" element={<App />} />
      <Route path="memory-game/infinite" element={<Infinite />} />
    </Routes>
  </BrowserRouter>
);