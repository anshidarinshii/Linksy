import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const query = new URLSearchParams(useLocation().search).get("q");

 useEffect(() => {
  const fetchResults = async () => {
    try {
      console.log("Searching for:", query); // <-- debug
      const res = await axios.get(`http://localhost:5000/api/resources/search?q=${query}`);
      console.log("Search API response:", res.data); // <-- debug
      setResults(res.data);
    } catch (err) {
      console.error("Error fetching search results:", err);
    } finally {
      setLoading(false);
    }
  };

  if (query) fetchResults();
}, [query]);


  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Search Results for "{query}"</h2>
      {results.length > 0 ? (
        <ul className="space-y-3">
          {results.map((r) => (
            <li key={r._id} className="p-4 border rounded shadow-sm">
              <h3 className="text-lg font-semibold">{r.name}</h3>
              <p className="text-gray-600">{r.description}</p>
              <p className="text-sm text-gray-500">{r.address}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No resources found.</p>
      )}
    </div>
  );
};

export default SearchResults;
