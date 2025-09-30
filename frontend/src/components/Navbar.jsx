import React, { useState } from "react";
import { FiSearch, FiUser } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");   // <-- new state
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search?q=${encodeURIComponent(search)}`);
      setSearch(""); // clear after search
    }
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src="/logo.png" alt="LINKSY" className="w-32 h-20" />
        </div>

        {/* Navigation Links */}
        <ul className="hidden md:flex space-x-6 text-purple-600 font-medium">
          <li><Link to="/" className="hover:text-purple-800">Home</Link></li>
          <li><Link to="/resources" className="hover:text-purple-800">Resources</Link></li>
          <li><Link to="/map" className="hover:text-purple-800">Map</Link></li>
          {user && (
            <li><Link to="/profile" className="hover:text-purple-800">Profile</Link></li>
          )}
           {user?.role === "admin" && (
              <li>
                <Link to="/admin" className="hover:text-purple-800">Admin</Link>
              </li>
          )}
        </ul>

        {/* Search + Icons */}
        <div className="flex items-center space-x-4">
          {/* Search bar */}
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search resources..."
              className="px-3 py-2 rounded-lg border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 text-purple-700 placeholder-purple-400 w-48"
            />
            <button type="submit">
              <FiSearch className="absolute right-3 top-2.5 text-purple-500" />
            </button>
          </form>

          {/* Auth: Login button OR Profile Icon */}
          {!user ? (
            <button
              onClick={() => navigate("/auth")}
              className="text-purple-600 hover:text-purple-800"
            >
              Login
            </button>
          ) : (
            <div className="relative">
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center space-x-1 text-purple-600 hover:text-purple-800"
              >
                <FiUser size={20} />
                <span>{user.name?.charAt(0).toUpperCase()}</span>
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow p-2 z-50">
                  <button
                    onClick={() => {
                      setOpen(false);
                      navigate("/profile");
                    }}
                    className="block w-full text-left px-2 py-1 hover:bg-purple-50 rounded"
                  >
                    Profile
                  </button>

                  <button
                    onClick={() => {
                      logout();
                      setOpen(false);
                      navigate("/");
                    }}
                    className="block w-full text-left px-2 py-1 hover:bg-purple-50 rounded"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
