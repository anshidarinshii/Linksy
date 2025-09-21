const API_BASE_URL = import.meta.env.VITE_API_BASE || "http://localhost:5000";

export async function fetchResources() {
  const res = await fetch(`${API_BASE}/api/resources`);
  if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
  return res.json();
}

export async function addResource(resource) {
  const res = await fetch(`${API_BASE_URL}/api/resources`, {
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
export async function fetchAllResources() {
  const res = await fetch(`${API_BASE_URL}/api/resources`);
  if (!res.ok) throw new Error("Failed to fetch resources");
  const json = await res.json();
  return Array.isArray(json) ? json : (json.data || []);
}

export async function fetchResourceById(id) {
  const res = await fetch(`${API_BASE_URL}/api/resources/${id}`);
  if (!res.ok) throw new Error("Failed to fetch resource");
  return res.json();
}