import { useEffect, useState } from "react";
import { getUsers } from "../api/api";

export default function UserList() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Users</h2>
      <ul className="list-disc pl-5">
        {users.map(user => (
          <li key={user._id}>{user.name} ({user.email})</li>
        ))}
      </ul>
    </div>
  );
}
