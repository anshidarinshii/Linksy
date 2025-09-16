// frontend/src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchResources } from "../utils/api";
import ResourceCard from "../components/ResourceCard";

export default function Home() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchResources();
      setResources(data);
    } catch (err) {
      setError(err.message || "Failed to load resources");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="page-home">
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Resources</h1>
        <Link to="/add">
          <button type="button">+ Add New Resource</button>
        </Link>
      </header>

      {loading && <p>Loading resources…</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {!loading && !error && resources.length === 0 && <p>No resources yet.</p>}

      <section className="resource-grid">
        {resources.map((r) => <ResourceCard key={r._id ?? r.id} resource={r} />)}
      </section>
    </div>
  );
}
