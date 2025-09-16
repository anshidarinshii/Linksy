import React from "react";

export default function ResourceCard({ resource }) {
  // resource: { _id or id, name, category, location, contact, verified }
  const id = resource._id ?? resource.id;
  return (
    <article data-id={id} className="resource-card">
      <h3>{resource.name}</h3>
      <p>{resource.category} {resource.location ? `• ${resource.location}` : ""}</p>
      {resource.contact && <p>Contact: {resource.contact}</p>}
      {resource.verified ? <small>Verified</small> : null}
    </article>
  );
}
