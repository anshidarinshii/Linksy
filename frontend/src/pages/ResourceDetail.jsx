import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchResourceById } from "../utils/api";
import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiUser,
} from "react-icons/fi";

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

  const categoryLabel =
    typeof resource.category === "object"
      ? resource.category.name
      : resource.category;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-purple-700">
            {resource.name}
          </h1>
          <p className="text-sm text-gray-600">{categoryLabel}</p>
        </div>
        {resource.verified ? (
          <span className="flex items-center text-green-600 font-semibold">
            <FiCheckCircle className="mr-1" /> Verified
          </span>
        ) : (
          <span className="flex items-center text-red-600 font-semibold">
            <FiXCircle className="mr-1" /> Unverified
          </span>
        )}
      </div>

      {/* Image */}
      {resource.image && (
        <div className="mt-6">
          <img
            src={resource.image}
            alt={resource.name}
            className="w-full rounded-lg shadow"
          />
        </div>
      )}

      {/* Description */}
      {resource.description && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-purple-700">
            Description
          </h2>
          <p className="text-gray-700 mt-2">{resource.description}</p>
        </div>
      )}

      {/* Details */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <p className="flex items-center">
            <FiMapPin className="mr-2 text-purple-500" />
            <strong>Address:</strong> {resource.address || "N/A"}
          </p>
          <p className="flex items-center">
            <FiClock className="mr-2 text-purple-500" />
            <strong>Available At:</strong> {resource.availableAt || "N/A"}
          </p>
        </div>

        <div className="space-y-3">
          <p className="flex items-center">
            <FiPhone className="mr-2 text-purple-500" />
            <strong>Phone:</strong> {resource.phone || "N/A"}
          </p>
          <p className="flex items-center">
            <FiMail className="mr-2 text-purple-500" />
            <strong>Email:</strong> {resource.mail || "N/A"}
          </p>
        </div>
      </div>

      {/* ✅ Contributor Info */}
      {resource.contributedBy && (
        <div className="mt-6 border-t pt-4">
          <p className="flex items-center text-gray-700">
            <FiUser className="mr-2 text-purple-500" />
            <strong>Contributed by:</strong>{" "}
            {resource.contributedBy?.name || "Anonymous"}
          </p>
        </div>
      )}
    </div>
  );
}
