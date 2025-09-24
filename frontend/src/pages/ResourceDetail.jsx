import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchResourceById } from "../utils/api";

export default function ResourceDetail() {
  const { id } = useParams();
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchResourceById(id)
      .then((data) => setResource(data))
      .catch((err) => setError(err.message || "Failed to load resource"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!resource) return <p className="text-center">Resource not found.</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-purple-700">{resource.name}</h1>
      <p className="text-sm text-gray-600 mt-1">
        {resource.category?.name || resource.category}
      </p>

      {resource.verified ? (
        <span className="text-green-600 font-semibold">✅ Verified</span>
      ) : (
        <span className="text-red-600 font-semibold">❌ Unverified</span>
      )}

      <div className="mt-4 space-y-2">
        <p><strong>Address:</strong> {resource.address}</p>
        <p><strong>Description:</strong> {resource.description}</p>
        <p><strong>Phone:</strong> {resource.phone}</p>
        <p><strong>Email:</strong> {resource.mail}</p>
        <p><strong>Available At:</strong> {resource.availableAt}</p>
      </div>

      {resource.image && (
        <div className="mt-4">
          <img src={resource.image} alt={resource.name} className="w-full rounded-lg" />
        </div>
      )}
    </div>
  );
}
