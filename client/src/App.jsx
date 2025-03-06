import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import GymDetails from "./pages/GymDetails";
import Navbar from "./components/NavBar";
import Login from "./components/Login";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Router>
        <div className="flex-grow">
          <Navbar />
          <Routes>
            <Route path="/auth" element={<Login />}/>
            <Route path="/" element={<Home />} />
            <Route path="/gyms/:id" element={<GymDetails />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
