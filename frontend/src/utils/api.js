const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

export async function fetchResources() {
  const res = await fetch(`${API_BASE}/api/resources`);
  if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
  return res.json();
}

export async function addResource(resource) {
  const res = await fetch(`${API_BASE}/api/resources`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(resource),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Add failed: ${res.status} ${text}`);
  }
  return res.json();
}
