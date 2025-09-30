import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddResource = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    description: "",
    mail: "",
    phone: "",
    address: "",
    availableAt: "",
    category: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5000/api/resources", form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessage("✅ Resource added successfully!");
      setTimeout(() => navigate("/"), 1500); // redirect to home after 1.5s
    } catch (err) {
      console.error("Error adding resource:", err);
      setMessage("❌ Failed to add resource.");
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold text-purple-700 mb-4">Add New Resource</h2>

      {/* Step Indicator */}
      <div className="flex justify-between mb-6 text-sm font-medium">
        {["Basic Info", "Location", "Category", "Review & Submit"].map((label, idx) => (
          <div
            key={idx}
            className={`flex-1 text-center pb-2 ${
              step === idx + 1
                ? "border-b-2 border-purple-600 text-purple-700"
                : "text-gray-400"
            }`}
          >
            {label}
          </div>
        ))}
      </div>

      {/* Step Forms */}
      {step === 1 && (
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Resource Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            type="email"
            name="mail"
            placeholder="Contact Email"
            value={form.mail}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="phone"
            placeholder="Contact Phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="availableAt"
            placeholder="Available At (e.g. 9AM - 5PM)"
            value={form.availableAt}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <input
            type="text"
            name="category"
            placeholder="Category (e.g. Food, Shelter)"
            value={form.category}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL (optional)"
            value={form.image}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
      )}

      {step === 4 && (
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Review Your Entry</h3>
          <div className="bg-gray-50 border rounded p-4 space-y-2">
            <p><strong>Name:</strong> {form.name}</p>
            <p><strong>Description:</strong> {form.description}</p>
            <p><strong>Email:</strong> {form.mail}</p>
            <p><strong>Phone:</strong> {form.phone}</p>
            <p><strong>Address:</strong> {form.address}</p>
            <p><strong>Available At:</strong> {form.availableAt}</p>
            <p><strong>Category:</strong> {form.category}</p>
            {form.image && (
              <div>
                <strong>Image:</strong>
                <img
                  src={form.image}
                  alt="Preview"
                  className="mt-2 w-40 h-28 object-cover rounded"
                />
              </div>
            )}
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 bg-green-600 text-white rounded w-full"
          >
            {loading ? "Submitting..." : "Submit Resource"}
          </button>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        {step > 1 && (
          <button onClick={prevStep} className="px-4 py-2 bg-gray-300 rounded">
            Back
          </button>
        )}
        {step < 4 && (
          <button
            onClick={nextStep}
            className="px-4 py-2 bg-purple-600 text-white rounded"
          >
            Next
          </button>
        )}
      </div>

      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
};

export default AddResource;