const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

export async function fetchResources() {
  const res = await fetch(`${API_BASE}/api/resources`);
  if (!res.ok) throw new Error("Failed to fetch resources");
  return res.json();
}

export async function addResource(payload) {
  const res = await fetch(`${API_BASE}/api/resources`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to add resource");
  return res.json();
}