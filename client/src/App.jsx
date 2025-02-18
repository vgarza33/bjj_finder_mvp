import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import GymDetails from "./pages/GymDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gyms/:id" element={<GymDetails />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
