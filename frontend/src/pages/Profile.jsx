import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

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
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <p>Loading profile...</p>;
  if (!profileData) return <p>No profile found.</p>;

  const { profile, stats, contributions, feedbacks } = profileData;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Top Profile Section */}
      <div className="flex items-center justify-between bg-white p-6 rounded shadow">
        <div>
          <h2 className="text-2xl font-bold">{profile.user.name}</h2>
          <p className="text-gray-600">{profile.user.email}</p>
          {profile.bio && <p className="mt-2 text-gray-700">{profile.bio}</p>}
        </div>
        <button className="px-4 py-2 bg-purple-600 text-white rounded">Edit Profile</button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-purple-100 p-4 rounded text-center">
          <p className="text-xl font-bold">{stats.contributionsCount}</p>
          <p>Contributions</p>
        </div>
        <div className="bg-green-100 p-4 rounded text-center">
          <p className="text-xl font-bold">{stats.verifiedEntriesCount}</p>
          <p>Verified Entries</p>
        </div>
      </div>

      {/* Contributions */}
      <div className="bg-white shadow p-6 rounded">
        <h3 className="text-xl font-bold mb-4">Resources You’ve Added</h3>
        {contributions.length > 0 ? (
          <ul className="space-y-2">
            {contributions.map((c) => (
              <li key={c._id} className="border-b pb-2">
                {c.resourceId?.name} <span className="text-gray-500">({c.action})</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No contributions yet.</p>
        )}
      </div>

      {/* Feedback */}
      <div className="bg-white shadow p-6 rounded">
        <h3 className="text-xl font-bold mb-4">Feedback</h3>
        {feedbacks.length > 0 ? (
          <ul className="space-y-2">
            {feedbacks.map((f) => (
              <li key={f._id} className="border-b pb-2">
                {f.comment} on <strong>{f.resourceId?.name}</strong>
              </li>
            ))}
          </ul>
        ) : (
          <p>No feedback yet.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
