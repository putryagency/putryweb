import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
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
          Login Putry Agency
        </h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="Email"
            className="border p-2 rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            Login
          </button>
        </form>
        <p className="text-center text-sm mt-3">
          Belum punya akun?{" "}
          <Link to="/register" className="text-pink-600 font-bold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
