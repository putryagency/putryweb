import React, { useState } from "react";
import { supabase } from "../utils/supabaseClient";

export default function CreatePost({ user }) {
  const [content, setContent] = useState("");

  const handlePost = async () => {
    if (!content) return;
    await supabase.from("posts").insert([{ content, user_id: user.id }]);
    setContent("");
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow mb-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Apa yang kamu pikirkan?"
        className="w-full border rounded-lg p-2 mb-2"
      />
      <button
        onClick={handlePost}
        className="bg-pink-500 text-white px-4 py-2 rounded-lg"
      >
        Post
      </button>
    </div>
  );
}
