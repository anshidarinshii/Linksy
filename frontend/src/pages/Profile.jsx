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

        if (!userId || !token) {
          setLoading(false);
          return;
        }

        // ✅ Real API Call
        const res = await axios.get(
          `http://localhost:5000/api/profile/${userId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setProfileData(res.data);

        /* 
        // ✅ Dummy Data (commented out for now)
        const dummyData = {
          profile: {
            user: { _id: "12345", name: "Sarah Johnson", email: "sarah.johnson@example.com" },
            bio: "Passionate about connecting communities with vital resources. I believe in fostering strong, supportive local networks to empower everyone.",
            profilePicture: null,
          },
          stats: { contributionsCount: 42, verifiedEntriesCount: 38 },
          contributions: [
            { _id: "c1", action: "added", resourceId: { name: "Community Food Bank" } },
            { _id: "c2", action: "added", resourceId: { name: "Local Health Clinic" } },
          ],
          feedbacks: [
            { _id: "f1", comment: "Great resource!", resourceId: { name: "Youth Mentorship Program" } },
          ],
        };

        setTimeout(() => {
          setProfileData(dummyData);
          setLoading(false);
        }, 800);
        */

      } catch (err) {
        console.error("❌ Error fetching profile:", err);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading profile...</p>;
  if (!profileData) return <p className="text-center mt-10">No profile found.</p>;

  const { profile, stats, contributions, feedbacks } = profileData;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Top section: User Info + Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {/* User Card */}
        <div className="bg-white shadow p-6 rounded col-span-2">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 rounded-full bg-purple-200 flex items-center justify-center text-3xl font-bold text-white">
              {profile.user.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-2xl font-bold">{profile.user.name}</h2>
              <p className="text-gray-600">{profile.user.email}</p>
              {profile.bio && <p className="text-sm text-gray-500 mt-2">{profile.bio}</p>}
              <button className="mt-3 px-4 py-2 border rounded hover:bg-gray-50">
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-purple-100 p-6 rounded text-center">
            <p className="text-2xl font-bold">{stats.contributionsCount}</p>
            <p className="text-gray-700">Contributions</p>
          </div>
          <div className="bg-green-100 p-6 rounded text-center">
            <p className="text-2xl font-bold">{stats.verifiedEntriesCount}</p>
            <p className="text-gray-700">Verified Entries</p>
          </div>
        </div>
      </div>

      {/* Contributions */}
      <div className="bg-white shadow p-6 rounded">
        <h3 className="text-xl font-bold mb-4">My Contributions</h3>
        {contributions.length > 0 ? (
          <ul className="grid md:grid-cols-2 gap-4">
            {contributions.map((c) => (
              <li key={c._id} className="border p-4 rounded">
                <strong>{c.resourceId?.name}</strong>
                <p className="text-sm text-gray-500">{c.action}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No contributions yet.</p>
        )}
      </div>

      {/* Feedback */}
      <div className="bg-white shadow p-6 rounded">
        <h3 className="text-xl font-bold mb-4">My Feedback</h3>
        {feedbacks.length > 0 ? (
          <ul className="space-y-2">
            {feedbacks.map((f) => (
              <li key={f._id} className="border p-4 rounded">
                <p>{f.comment}</p>
                <p className="text-sm text-gray-500">
                  on <strong>{f.resourceId?.name}</strong>
                </p>
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
