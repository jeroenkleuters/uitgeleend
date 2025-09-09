import { useEffect, useState } from "react";
import { getUsers } from "../api/api";

export default function UserList({ onSelect }: { onSelect: (id: string) => void }) {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  return (
    <div>
      <select
        className="border p-1"
        onChange={e => onSelect(e.target.value)}
        defaultValue=""
        name="users"
      >
        <option value="" disabled>
          Kies een gebruiker...
        </option>
        {users.map(user => (
          <option key={user._id} value={user._id}>
            {user.name} ({user.email})
          </option>
        ))}
      </select>
    </div>
  );
}
