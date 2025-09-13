import React from "react";
import { FiSearch, FiBell, FiUser } from "react-icons/fi";

const Navbar = () => {

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
            <a href="#" className="hover:text-purple-800">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-purple-800">
              Add Resource
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-purple-800">
              Map
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-purple-800">
              Profile
            </a>
          </li>
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

          {/* Login Icon */}
          <button className="text-purple-600 hover:text-purple-800">
            <FiUser size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;