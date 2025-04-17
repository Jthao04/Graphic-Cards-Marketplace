import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Listings from "./pages/Listings";
import ListingDetails from "./pages/ListingDetails";
import Dashboard from "./pages/Dashboard";
import AppNavbar from "./components/Navbar"; 
import GpuPriceChecker from "./pages/GpuPriceChecker";
import Login from "./components/Login";

function App() {
  return (
    <>
      <AppNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/listings/:id" element={<ListingDetails />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sell" element={<GpuPriceChecker />} />
        {/* Optional fallback route */}
        <Route path="*" element={<div className="p-6">404 Not Found</div>} />
      </Routes>
    </>
  );
}

export default App;
