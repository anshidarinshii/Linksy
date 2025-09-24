import { useEffect, useState } from "react";
import ResourceCard from "../components/ResourceCard";
import { fetchAllResources } from "../utils/api";

export default function Resources() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    fetchAllResources()
      .then((arr) => setResources(arr))
      .catch((e) => setError(e.message || "Failed to load resources"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mt-6 mb-4 text-purple-700">
        All Resources
      </h1>

      {loading && <p className="text-gray-500">Loading...</p>}
      {error && (
        <div className="p-4 rounded-lg border border-red-200 bg-red-50 text-red-700">
          {error}
        </div>
      )}

      {!loading && !error && resources.length === 0 && (
        <p className="text-gray-500">No resources available.</p>
      )}

      {!loading && !error && resources.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {resources.map((r) => (
            <ResourceCard key={r._id || r.id} resource={r} />
          ))}
        </div>
      )}
    </div>
  );
}
