import React from "react";
import RoleBadge from "./RoleBadge";

export default function PostCard({ post }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow mb-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="font-bold">{post.username}</span>
        <RoleBadge role={post.role} />
        <span className="text-gray-400 text-sm">
          {new Date(post.created_at).toLocaleString()}
        </span>
      </div>
      <p>{post.content}</p>
    </div>
  );
}
