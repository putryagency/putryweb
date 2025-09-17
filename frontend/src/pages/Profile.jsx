import React, { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import Navbar from "../components/Navbar";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
  }, []);

  return (
    <div>
      <Navbar user={user?.user_metadata} />
      <div className="max-w-md mx-auto mt-6 bg-white p-6 rounded-xl shadow">
        <h1 className="text-xl font-bold mb-2">Profile</h1>
        {user ? (
          <div>
            <p>Email: {user.email}</p>
            <p>Username: {user.user_metadata?.username}</p>
            <p>Role: {user.user_metadata?.role}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
