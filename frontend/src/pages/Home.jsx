import { useEffect, useState } from "react";
import ResourceCard from "../components/ResourceCard";
import SearchBar from "../components/SearchBar";
import MapPlaceholder from "../components/MapPlaceholder";
import { fetchResources } from "../utils/api";

export default function Home() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchResources();
      setResources(data);
    } catch (err) {
      setError(err.message || "Failed to load");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  function handleSearch(q) {
    setQuery(q);
    // simple client-side filter for now
    if (!q) return load();
    const filtered = resources.filter(r =>
      (r.name || "").toLowerCase().includes(q.toLowerCase()) ||
      (r.category || "").toLowerCase().includes(q.toLowerCase()) ||
      (r.address || "").toLowerCase().includes(q.toLowerCase())
    );
    setResources(filtered);
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <section className="mb-8 text-center">
        <h1 className="text-4xl font-bold">OpenDataLocal</h1>
        <p className="text-gray-600 mt-2">Community-sourced local resources.</p>
      </section>

      <section className="mb-6">
        <SearchBar onSearch={handleSearch} />
      </section>

      <section className="mb-6">
        <MapPlaceholder />
      </section>

      <section>
        {loading && <p>Loading resources…</p>}
        {error && <p className="text-red-600">Error: {error}</p>}
        {!loading && !error && (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            {resources.length === 0 && <p>No resources yet.</p>}
            {resources.map((r) => (
              <ResourceCard key={r._id || r.name} {...r} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}