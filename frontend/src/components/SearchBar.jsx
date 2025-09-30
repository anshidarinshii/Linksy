import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

const handleSearch = (e) => {
  e.preventDefault();
  if (search.trim()) {
    console.log("Navigating to:", `/search?q=${search}`);
    navigate(`/search?q=${encodeURIComponent(search)}`);
  }
};


  return (
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
  );
};

export default SearchBar;
