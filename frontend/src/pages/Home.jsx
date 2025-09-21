import { useEffect, useState } from 'react';
import HeroCard from '../components/HeroCard.jsx';
import ResourceCard from '../components/ResourceCard.jsx';
import { fetchAllResources } from '../utils/api.js';
import MapPreview from '../components/MapPreview.jsx';


export default function Home() {
	const [resources, setResources] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	useEffect(() => {
		setLoading(true);
		setError('');
		fetchAllResources()
			.then((arr) => setResources(arr))
			.catch((e) => setError(e.message || 'Failed to load resources'))
			.finally(() => setLoading(false));
	}, []);

	return (
		<div className="min-h-screen">
			<div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
				<div className="mt-6">
					<HeroCard />
				</div>
				<div className="mt-6">
					<div className="flex items-center justify-between mb-2">
						<h2 className="text-lg font-semibold">Explore Resources from Map</h2>
					</div>
					<MapPreview />
				</div>


				<div className="mt-6">
					<div className="flex items-center justify-between">
						<h2 className="text-lg font-semibold">Featured Resources</h2>
						<span className="text-sm text-zinc-600 dark:text-zinc-400">{resources.length} found</span>
					</div>

					{loading && (
						<div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
							{Array.from({ length: 6 }).map((_, i) => (
								<div key={i} className="h-40 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
							))}
						</div>
					)}

					{!loading && error && (
						<div className="mt-4 p-4 rounded-lg border border-red-200 bg-red-50 text-red-700">
							{error}
						</div>
					)}

					{!loading && !error && resources.length === 0 && (
						<div className="mt-6 text-center p-8 rounded-xl border border-zinc-200 dark:border-zinc-800">
							<p className="text-zinc-700 dark:text-zinc-300">No resources yet.</p>
						</div>
					)}

					{!loading && !error && resources.length > 0 && (
						<div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
							{resources.map((r) => (
								<ResourceCard key={r._id || r.id} resource={r} />
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
