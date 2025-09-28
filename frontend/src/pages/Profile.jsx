import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: "", bio: "", password: "", profilePicture: "" });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
        if (!userId || !token) return;

        const res = await axios.get(`http://localhost:5000/api/profile/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfileData(res.data);
        setForm({
          name: res.data.user.name,
          bio: res.data.bio || "",
          profilePicture: res.data.profilePicture || "",
          password: "",
        });
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

      await axios.put(
        `http://localhost:5000/api/profile/${userId}`,
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setProfileData({
        ...profileData,
        user: { ...profileData.user, name: form.name },
        bio: form.bio,
        profilePicture: form.profilePicture,
      });
      setEditing(false);
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  if (loading) return <p>Loading profile...</p>;
  if (!profileData) return <p>No profile found.</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Top Profile Section */}
      <div className="flex items-center justify-between bg-white p-6 rounded shadow">
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
            <input
              type="text"
              value={form.profilePicture}
              onChange={(e) => setForm({ ...form, profilePicture: e.target.value })}
              placeholder="Profile picture URL"
              className="border p-2 rounded w-full"
            />
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
          <div>
            <h2 className="text-2xl font-bold">{profileData?.profile?.user?.name || "Unnamed User"}</h2>
            <p className="text-gray-600">{profileData?.profile?.user?.email || "No email"}</p>
            {profileData.bio && <p className="mt-2 text-gray-700">{profileData.bio}</p>}
            {profileData.profilePicture && (
              <img
                src={profileData.profilePicture}
                alt="Profile"
                className="w-24 h-24 rounded-full mt-2"
              />
            )}
            <button
              onClick={() => setEditing(true)}
              className="mt-3 px-4 py-2 bg-purple-600 text-white rounded"
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
