import React, { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import Navbar from "../components/Navbar";
import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";

export default function Home() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    fetchPosts();

    // Realtime listener
    const channel = supabase
      .channel("realtime-posts")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "posts" },
        () => {
          fetchPosts();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchPosts = async () => {
    let { data, error } = await supabase
      .from("posts")
      .select("*, profiles(username, role)")
      .order("created_at", { ascending: false });

    if (!error) {
      setPosts(
        data.map((p) => ({
          ...p,
          username: p.profiles?.username,
          role: p.profiles?.role,
        }))
      );
    }
  };

  return (
    <div>
      <Navbar user={user?.user_metadata} />
      <div className="max-w-lg mx-auto mt-6">
        {user && <CreatePost user={user} />}
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
