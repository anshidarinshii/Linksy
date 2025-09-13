export default function ResourceCard({ name, category, address, contact }) {
  return (
    <article className="border rounded p-4 shadow-sm">
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-sm text-gray-600">{category} • {address}</p>
      {contact && <p className="mt-2 text-sm">Contact: {contact}</p>}
    </article>
  );
}