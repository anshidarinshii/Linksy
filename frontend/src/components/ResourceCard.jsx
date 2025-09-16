export default function ResourceCard({ resource }) {
	return (
		<div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 flex flex-col gap-3">
			<div className="flex items-start justify-between gap-3">
				<div>
					<h3 className="font-semibold">{resource?.name}</h3>
					<div className="mt-1 flex items-center gap-2">
						{resource?.category && (
							<span className="text-xs px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
								{resource.category}
							</span>
						)}
						{resource?.verified && (
							<span className="text-xs px-2 py-0.5 rounded bg-green-100 text-green-700">Verified</span>
						)}
					</div>
				</div>
				{resource?.image && (
					<img src={resource.image} alt={resource.name} className="w-16 h-16 rounded-lg object-cover border border-zinc-200 dark:border-zinc-800" loading="lazy" />
				)}
			</div>

			{resource?.description && <p className="text-sm text-zinc-700 dark:text-zinc-300">{resource.description}</p>}

			<div className="mt-1 space-y-1 text-sm">
				{resource?.address && <p className="text-zinc-700 dark:text-zinc-300">{resource.address}</p>}
				<div className="flex flex-wrap gap-3 text-zinc-600 dark:text-zinc-400">
					{resource?.phone && <span>📞 {resource.phone}</span>}
					{resource?.mail && <span>✉️ {resource.mail}</span>}
					{resource?.availableAt && <span>🕒 {resource.availableAt}</span>}
				</div>
			</div>
		</div>
	);
}