import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchData = async () => {
      try {
        const resStats = await axios.get("http://localhost:5000/api/admin/stats", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStats(resStats.data);

        const resUsers = await axios.get("http://localhost:5000/api/admin/users", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsers(resUsers.data);

        const resResources = await axios.get("http://localhost:5000/api/admin/resources", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setResources(resResources.data);

      } catch (err) {
        console.error("Error loading admin data", err);
      }
    };

    fetchData();
  }, []);

  if (!stats) return <p>Loading dashboard...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Stats Section */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-purple-100 p-4 rounded text-center">
          <h2 className="text-lg font-bold">{stats.userCount}</h2>
          <p>Users</p>
        </div>
        <div className="bg-green-100 p-4 rounded text-center">
          <h2 className="text-lg font-bold">{stats.resourceCount}</h2>
          <p>Resources</p>
        </div>
        <div className="bg-blue-100 p-4 rounded text-center">
          <h2 className="text-lg font-bold">{stats.feedbackCount}</h2>
          <p>Feedbacks</p>
        </div>
      </div>

      {/* Users Section */}
      <div className="bg-white shadow p-6 rounded">
        <h3 className="text-xl font-bold mb-4">Users</h3>
        <ul>
          {users.map((u) => (
            <li key={u._id} className="border-b py-2 flex justify-between">
              <span>{u.name} ({u.email})</span>
              <span>Status: {u.active ? "Active ✅" : "Blocked ❌"}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Resources Section */}
      <div className="bg-white shadow p-6 rounded">
        <h3 className="text-xl font-bold mb-4">Resources</h3>
        <ul>
          {resources.map((r) => (
            <li key={r._id} className="border-b py-2">
              {r.name} - {r.category}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
