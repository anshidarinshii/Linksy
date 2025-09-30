import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import ResourceCard from "../components/ResourceCard";

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const query = new URLSearchParams(useLocation().search).get("q");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        console.log("Searching for:", query);
        const res = await axios.get(
          `http://localhost:5000/api/resources/search?q=${query}`
        );
        console.log("Search API response:", res.data);
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
      <h2 className="text-2xl font-bold mb-4">
        Search Results for "{query}"
      </h2>

      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {results.map((r) => (
            <ResourceCard key={r._id} resource={r} />
          ))}
        </div>
      ) : (
        <p>No resources found.</p>
      )}
    </div>
  );
};

export default SearchResults;
