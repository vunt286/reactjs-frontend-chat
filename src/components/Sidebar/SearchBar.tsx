import React from "react";
import "./Sidebar.css";

type User = { id: number; name: string };
type SidebarProps = {
  users: User[];
  onSelectUser: (id: number) => void;
  selectedUserId: number | null;
};

export default function Sidebar({ users, onSelectUser, selectedUserId }: SidebarProps) {
  return (
    <div className="sidebar">
      <h3>Chats</h3>
      <ul>
        {users.map((user) => (
          <li
            key={user.id}
            className={user.id === selectedUserId ? "active" : ""}
            onClick={() => onSelectUser(user.id)}
          >
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
