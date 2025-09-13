import { useState } from "react";
import { addResource } from "../utils/api";

export default function AddResource() {
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  async function submit(e) {
    e.preventDefault();
    try {
      await addResource({ name, category: "Other", address: "" });
      setMsg("Submitted");
      setName("");
    } catch (err) {
      setMsg("Error: " + err.message);
    }
  }
  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl mb-4">Add Resource</h2>
      <form onSubmit={submit} className="space-y-3">
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Name" className="border p-2 w-full"/>
        <button className="px-4 py-2 bg-blue-600 text-white rounded">Submit</button>
      </form>
      {msg && <p className="mt-2">{msg}</p>}
    </div>
  );
}