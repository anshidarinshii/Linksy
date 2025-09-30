import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import RequireAuth from "./components/RequireAuth";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AddResource from "./pages/AddResource";
import Resources from "./pages/Resources";
import ResourceDetail from "./pages/ResourceDetail";
import AdminDashboard from "./pages/AdminDashboard";
import Map from "./pages/Map";
import Profile from "./pages/Profile";
import Footer from "./components/Footer";
import Auth from './pages/Auth';
import SearchResults from "./pages/SearchResults";


const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200">
          <Navbar />
          <main className="flex-grow text-center pt-6 text-purple-800 py-20">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/resources/:id" element={<ResourceDetail />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/auth" element={<Auth />} />
              <Route
                path="/add"
                element={
                <RequireAuth>
                  <AddResource />
                </RequireAuth>
                }
              />
              <Route path="/map" element={<Map />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
          <Footer />
        </div>
    </BrowserRouter>
    </AuthProvider>
    
  );
};

export default App;
