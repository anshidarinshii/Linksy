import { FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";


export default function ResourceCard({ resource }) {
  const categoryLabel =
    typeof resource?.category === "object"
      ? resource?.category?.name
      : resource?.category;
  
  
	return (
		<Link to={`api/resources/${resource._id || resource.id}`}>
			<div className="group rounded-xl border border-zinc-200 bg-white p-4 transition-colors duration-300 hover:bg-purple-500 hover:text-white">
				<div className="flex items-start justify-between gap-3">
					<div className="flex flex-col gap-2">
						<div className="flex items-center gap-2 flex-wrap">
							<h3 className="font-semibold">{resource?.name}</h3>

							{categoryLabel && (
								<span className="text-xs px-2 py-0.5 rounded-full border-2 border-blue-500/70 text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/20">
									{categoryLabel}
								</span>
							)}
						</div>

						{/* ✅ Show Address / Location */}
						{resource?.address && (
							<p className="text-sm text-gray-600 dark:text-gray-400">
								<FaMapMarkerAlt className="text-red-500 group-hover:text-white" />
								{resource.address}
							</p>
						)}
					</div>

					{resource?.verified ? (
						<span className="text-xs px-2 py-0.5 rounded-full border-2 border-green-500/70 text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-900/20">
							Verified
						</span>
					) : (
						<span className="text-xs px-2 py-0.5 rounded-full border-2 border-red-500/70 text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-900/20">
							Unverified
						</span>
					)}
				</div>
			</div>
		</Link>
	);
}
