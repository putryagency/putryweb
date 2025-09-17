import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { username, role: "user" } },
    });
    if (error) {
      alert(error.message);
    } else {
      navigate("/home");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-pink-100">
      <div className="bg-white p-8 rounded-xl shadow w-80">
        <h1 className="text-2xl font-bold mb-4 text-center text-pink-600">
          Register
        </h1>
        <form onSubmit={handleRegister} className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="Email"
            className="border p-2 rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Username"
            className="border p-2 rounded-lg"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="border p-2 rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-pink-500 text-white p-2 rounded-lg"
          >
            Register
          </button>
        </form>
        <p className="text-center text-sm mt-3">
          Sudah punya akun?{" "}
          <Link to="/" className="text-pink-600 font-bold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
