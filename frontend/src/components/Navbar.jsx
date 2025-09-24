import React, { useState } from "react";
import { FiSearch, FiBell, FiUser } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";   // ⬅️ add this
import { useNavigate, Link } from "react-router-dom";     // ⬅️ add this

const Navbar = () => {
  const { user, logout } = useAuth();  // ⬅️ access auth state
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  console.log("Rendering Navbar");

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src="/logo.png" alt="LINKSY" className="w-32 h-20" />
        </div>

        {/* Navigation Links */}
        <ul className="hidden md:flex space-x-6 text-purple-600 font-medium">
          <li>
            <a href="/" className="hover:text-purple-800">Home</a>
          </li>
          <li>
            <a href="/resources" className="hover:text-purple-800">Resources</a>
          </li>
          <li>
            <a href="/map" className="hover:text-purple-800">Map</a>
          </li>
          {user && ( // Only show Profile if logged in
            <li><Link to="/profile" className="hover:text-purple-800">Profile</Link></li>
          )}
        </ul>

        {/* Search + Icons */}
        <div className="flex items-center space-x-4">
          {/* Search bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search resources..."
              className="px-3 py-2 rounded-lg border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 text-purple-700 placeholder-purple-400 w-48"
            />
            <FiSearch className="absolute right-3 top-2.5 text-purple-500" />
          </div>

          {/* Notification Icon */}
          <button className="text-purple-600 hover:text-purple-800">
            <FiBell size={20} />
          </button>

          {/* Auth: Login button OR Profile Icon */}
          {!user ? (
            <button
              onClick={() => navigate("/auth")}
              className="text-purple-600 hover:text-purple-800"
            >
              Login
            </button>
          ) : (
            <div
              className="relative"
              onMouseEnter={() => setOpen(true)}
              onMouseLeave={() => setOpen(false)}
            >
              <button className="text-purple-600 hover:text-purple-800"> 
                <FiUser size={20} /> 
                {user.name?.charAt(0).toUpperCase()}
              </button>
              {open && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow p-2">
                  <button
                    onClick={() => navigate("/profile")}
                    className="block w-full text-left px-2 py-1 hover:bg-purple-50 rounded"
                  >
                    Profile
                  </button>
                  <button
                    onClick={() => { logout(); navigate("/"); }}
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
