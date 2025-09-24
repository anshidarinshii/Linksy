import { FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function ResourceCard({ resource }) {
  const categoryLabel =
    typeof resource?.category === "object"
      ? resource?.category?.name
      : resource?.category;

  return (
    <Link to={`/api/resources/${resource._id || resource.id}`}>
      {/* Reduced card height (h-28 = 7rem tall) */}
      <div className="group relative h-28 flex flex-col rounded-xl border border-zinc-200 bg-white p-3 transition-colors duration-300 hover:bg-purple-500 hover:text-white">
        {/* Main Content */}
        <div className="flex flex-col gap-1">
          {/* Row 1: Name */}
          <h3 className="font-semibold text-xs text-center truncate">
            {resource?.name}
          </h3>

          {/* Row 2: Address / Location (centered) */}
          {resource?.address && (
            <p className="flex justify-center items-center gap-1 text-[11px] text-gray-600 truncate">
              <FaMapMarkerAlt className="text-red-500 group-hover:text-white w-3 h-3" />
              {resource.address}
            </p>
          )}
        </div>

        {/* Category Badge (Bottom Left) */}
        {categoryLabel && (
          <span className="absolute bottom-1 left-2 text-[10px] px-2 py-0.5 rounded-full border-2 border-blue-500/70 text-blue-700 bg-blue-50">
            {categoryLabel}
          </span>
        )}

        {/* Verification Badge (Bottom Right) */}
        <span
          className={`absolute bottom-1 right-2 text-[10px] px-2 py-0.5 rounded-full border-2 ${
            resource?.verified
              ? "border-green-500/70 text-green-700 bg-green-50"
              : "border-red-500/70 text-red-700 bg-red-50"
          }`}
        >
          {resource?.verified ? "Verified" : "Unverified"}
        </span>
      </div>
    </Link>
  );
}
