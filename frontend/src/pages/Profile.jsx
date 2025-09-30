import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiCheckCircle, FiXCircle, FiMapPin } from "react-icons/fi";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("contributions");
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: "",
    bio: "",
    password: "",
    profilePicture: "",
  });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
        if (!userId || !token) return;

        const res = await axios.get(
          `http://localhost:5000/api/profile/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const profile = res.data.profile || res.data; // ✅ ensure correct shape
        setProfileData(profile);

        setForm({
          name: profile.user?.name || "",
          bio: profile.bio || "",
          profilePicture: profile.profilePicture || "",
          password: "",
        });

        const resourcesRes = await axios.get(
          `http://localhost:5000/api/resources?contributedBy=${userId}`
        );
        setResources(resourcesRes.data.data || []);
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("bio", form.bio);
      if (form.password) formData.append("password", form.password);
      if (imageFile) formData.append("profilePicture", imageFile);

      const res = await axios.put(
        `http://localhost:5000/api/profile/${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const updatedProfile = res.data.profile || res.data;
      setProfileData(updatedProfile);
      setEditing(false);
      setImageFile(null);
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  if (loading) return <p>Loading profile...</p>;
  if (!profileData) return <p>No profile found.</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded shadow text-center">
          <img
            src={
              profileData.profilePicture
                ? `http://localhost:5000${profileData.profilePicture}`
                : "/default-avatar.png"
            }
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto object-cover"
          />
          <h2 className="mt-3 text-xl font-bold">
            {profileData.user?.name || "Unnamed User"}
          </h2>
          <span className="inline-block text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded mt-1">
            {profileData.role || "Member"}
          </span>
          {profileData.bio && (
            <p className="mt-3 text-gray-700">{profileData.bio}</p>
          )}
          <button
            onClick={() => {
              setActiveTab("settings");
              setEditing(true);
            }}
            className="mt-4 px-4 py-2 bg-purple-600 text-white rounded"
          >
            Edit Profile
          </button>
        </div>

        {/* Stats */}
        <div className="md:col-span-2 bg-white p-6 rounded shadow flex justify-around items-center">
          <div className="text-center">
            <p className="text-3xl font-bold text-purple-700">
              {resources.length}
            </p>
            <p className="text-gray-600">Contributions</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-purple-700">
              {resources.filter((r) => r.verified).length}
            </p>
            <p className="text-gray-600">Verified Entries</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b flex space-x-6 text-sm font-medium">
        <button
          className={`pb-2 ${
            activeTab === "contributions"
              ? "border-b-2 border-purple-600 text-purple-600"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("contributions")}
        >
          My Contributions
        </button>
        <button
          className={`pb-2 ${
            activeTab === "settings"
              ? "border-b-2 border-purple-600 text-purple-600"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("settings")}
        >
          Settings
        </button>
      </div>

      {/* Contributions Tab */}
      {activeTab === "contributions" && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {resources.map((res) => (
            <div key={res._id} className="p-4 bg-white rounded shadow">
              <h3 className="font-semibold">{res.name}</h3>
              <p className="text-sm text-gray-500 flex items-center">
                <FiMapPin className="mr-1" /> {res.address}
              </p>
              <span className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded mr-2">
                {typeof res.category === "object"
                  ? res.category.name
                  : res.category}
              </span>
              {res.verified ? (
                <span className="text-xs flex items-center text-green-600 mt-2">
                  <FiCheckCircle className="mr-1" /> Verified
                </span>
              ) : (
                <span className="text-xs flex items-center text-red-600 mt-2">
                  <FiXCircle className="mr-1" /> Unverified
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === "settings" && (
        <div className="bg-white p-6 rounded shadow">
          {editing ? (
            <div className="space-y-3">
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Name"
                className="border p-2 rounded w-full"
              />
              <input
                type="text"
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                placeholder="Bio"
                className="border p-2 rounded w-full"
              />
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="New Password"
                className="border p-2 rounded w-full"
              />
              <div>
                <label className="block text-sm font-medium mb-1">
                  Profile Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  className="border p-2 rounded w-full"
                />
              </div>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Save
              </button>
              <button
                onClick={() => setEditing(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>
            </div>
          ) : (
            <p className="text-gray-600">
              Switch to Edit Profile to update settings.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
