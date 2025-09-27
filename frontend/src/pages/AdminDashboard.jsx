import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const [pendingResources, setPendingResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");

        // ✅ Get stats
        const statsRes = await axios.get("http://localhost:5000/api/admin/stats", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(statsRes.data);

        // ✅ Get pending resources
        const pendingRes = await axios.get("http://localhost:5000/api/admin/pending-resources", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPendingResources(pendingRes.data);
      } catch (err) {
        console.error("Error loading admin dashboard:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const handleAction = async (id, action) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `http://localhost:5000/api/admin/resources/${id}/${action}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setPendingResources(pendingResources.filter((r) => r._id !== id));
    } catch (err) {
      console.error("Error updating resource:", err);
    }
  };

  if (loading) return <p>Loading admin dashboard...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <h2 className="text-2xl font-bold">Admin Dashboard</h2>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white shadow p-4 rounded text-center">
          <p className="text-xl font-bold">{stats.pendingResources}</p>
          <p>Pending Resources</p>
        </div>
        <div className="bg-white shadow p-4 rounded text-center">
          <p className="text-xl font-bold">{stats.totalUsers}</p>
          <p>Total Users</p>
        </div>
        <div className="bg-white shadow p-4 rounded text-center">
          <p className="text-xl font-bold">{stats.activeModerators}</p>
          <p>Active Moderators</p>
        </div>
      </div>

      {/* Pending Resources */}
      <div className="bg-white shadow p-6 rounded">
        <h3 className="text-xl font-bold mb-4">Pending Resources</h3>
        {pendingResources.length > 0 ? (
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Title</th>
                <th className="p-2 border">Category</th>
                <th className="p-2 border">Submitted By</th>
                <th className="p-2 border">Submitted Date</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingResources.map((r) => (
                <tr key={r._id}>
                  <td className="p-2 border">{r.name}</td>
                  <td className="p-2 border">{r.category}</td>
                  <td className="p-2 border">{r.submittedBy?.name}</td>
                  <td className="p-2 border">{new Date(r.createdAt).toLocaleDateString()}</td>
                  <td className="p-2 border space-x-2">
                    <button
                      onClick={() => handleAction(r._id, "approve")}
                      className="px-3 py-1 bg-green-500 text-white rounded"
                    >
                      Verify
                    </button>
                    <button
                      onClick={() => handleAction(r._id, "reject")}
                      className="px-3 py-1 bg-red-500 text-white rounded"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No pending resources.</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
