// frontend/src/pages/AddResource.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addResource } from "../utils/api";

export default function AddResource() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    if (!name.trim() || !category.trim()) {
      setError("Name and category are required.");
      return;
    }

    const payload = { name: name.trim(), category: category.trim(), location: location.trim(), contact: contact.trim() };
    setLoading(true);
    try {
      await addResource(payload);
      setSuccessMsg("Resource added successfully.");
      // short delay so user sees message, then go back to home
      setTimeout(() => navigate("/"), 700);
    } catch (err) {
      setError(err.message || "Failed to add resource");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page-add">
      <h2>Add New Resource</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name (required)</label>
          <input value={name} onChange={e => setName(e.target.value)} />
        </div>

        <div>
          <label>Category (required)</label>
          <input value={category} onChange={e => setCategory(e.target.value)} />
        </div>

        <div>
          <label>Location</label>
          <input value={location} onChange={e => setLocation(e.target.value)} />
        </div>

        <div>
          <label>Contact</label>
          <input value={contact} onChange={e => setContact(e.target.value)} />
        </div>

        <div style={{ marginTop: 10 }}>
          <button type="submit" disabled={loading}>{loading ? "Adding…" : "Add Resource"}</button>
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}
        {successMsg && <p style={{ color: "green" }}>{successMsg}</p>}
      </form>
    </div>
  );
}
