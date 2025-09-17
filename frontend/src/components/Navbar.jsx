import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";

export default function Navbar({ user }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <Link to="/home" className="font-bold text-xl text-pink-600">
        Putry Agency
      </Link>
      <div className="flex items-center gap-4">
        <Link to="/profile" className="text-gray-600 hover:text-pink-600">
          Profile
        </Link>
        {user?.role === "admin" && (
          <Link to="/admin" className="text-gray-600 hover:text-pink-600">
            Admin Panel
          </Link>
        )}
        <button
          onClick={handleLogout}
          className="bg-pink-500 text-white px-4 py-1 rounded-lg"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
