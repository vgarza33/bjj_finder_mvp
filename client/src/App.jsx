import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import GymDetails from "./pages/GymDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gyms/:id" element={<GymDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
