import React from "react";

export default function RoleBadge({ role }) {
  if (!role) return null;
  let color = "bg-gray-300";
  if (role === "admin") color = "bg-red-500";
  if (role === "moderator") color = "bg-blue-500";
  if (role === "user") color = "bg-green-500";

  return (
    <span
      className={`${color} text-white text-xs px-2 py-1 rounded-full`}
    >
      {role}
    </span>
  );
}
