import React, { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import Navbar from "../components/Navbar";

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [role, setRole] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    let { data, error } = await supabase.from("profiles").select("*");
    if (!error) setUsers(data);
  };

  const updateRole = async (id, newRole) => {
    await supabase.from("profiles").update({ role: newRole }).eq("id", id);
    fetchUsers();
  };

  return (
    <div>
      <Navbar user={{ role: "admin" }} />
      <div className="max-w-2xl mx-auto mt-6 bg-white p-6 rounded-xl shadow">
        <h1 className="text-xl font-bold mb-4">Admin Panel</h1>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Email</th>
              <th className="border p-2">Username</th>
              <th className="border p-2">Role</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td className="border p-2">{u.email}</td>
                <td className="border p-2">{u.username}</td>
                <td className="border p-2">{u.role}</td>
                <td className="border p-2">
                  <select
                    value={u.role}
                    onChange={(e) => updateRole(u.id, e.target.value)}
                    className="border p-1 rounded"
                  >
                    <option value="user">User</option>
                    <option value="moderator">Moderator</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
