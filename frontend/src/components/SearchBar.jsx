import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [q, setQ] = useState("");
  return (
    <div className="flex gap-2 items-center">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search resources..."
        className="border rounded px-3 py-2 w-full"
      />
      <button
        onClick={() => onSearch(q)}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Search
      </button>
    </div>
  );
}