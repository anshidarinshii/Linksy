import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AddResource from "./pages/AddResource";
import Map from "./pages/Map";
import Profile from "./pages/Profile";
import Footer from "./components/Footer";

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200">
        <Navbar />
        <main className="flex-grow text-center pt-6 text-purple-800 py-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddResource />} />
            <Route path="/map" element={<Map />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
