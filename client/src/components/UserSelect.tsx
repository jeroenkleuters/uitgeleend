import { useState, useEffect } from "react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getUsers, createUser } from "../api/api"; // pas pad aan naar jouw api.ts

interface User {
  _id: string;
  name: string;
  email: string;
}

interface UserSelectProps {
  value: string | null; // geselecteerde userId
  onChange: (userId: string | null) => void; // callback naar parent
}

export default function UserSelect({ value, onChange }: UserSelectProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return !isAddingUser ? (
    <Select
      value={value ?? ""}
      onValueChange={(val) => {
        if (val === "new") {
          setIsAddingUser(true);
        } else if (val === "none") {
          onChange(null);
        } else {
          onChange(val);
        }
      }}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Kies een gebruiker" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="none">-- Geen --</SelectItem>
        {users.map((u) => (
          <SelectItem key={u._id} value={u._id}>
            {u.name} ({u.email})
          </SelectItem>
        ))}
        <SelectItem value="new">➕ Nieuwe gebruiker toevoegen</SelectItem>
      </SelectContent>
    </Select>
  ) : (
    <div className="space-y-2">
      <Input
        placeholder="Naam nieuwe gebruiker"
        value={newUserName}
        onChange={(e) => setNewUserName(e.target.value)}
      />
      <Input
        placeholder="E-mail nieuwe gebruiker"
        type="email"
        value={newUserEmail}
        onChange={(e) => setNewUserEmail(e.target.value)}
      />
      <div className="flex gap-2">
        <Button
          type="button"
          variant="destructive"
          onClick={() => {
            setIsAddingUser(false);
            setNewUserName("");
            setNewUserEmail("");
          }}
        >
          Annuleren
        </Button>
        <Button
          type="button"
          variant="destructive"
          disabled={loading}
          onClick={async () => {
            if (!newUserName || !newUserEmail) {
              alert("Vul naam en e-mail in voor de nieuwe gebruiker.");
              return;
            }
            setLoading(true);
            try {
              const created = await createUser(newUserName, newUserEmail);
              onChange(created._id);
              setIsAddingUser(false);
              setNewUserName("");
              setNewUserEmail("");
              await fetchUsers();
            } catch (err) {
              console.error("Fout bij maken gebruiker:", err);
              alert("Fout bij maken gebruiker.");
            } finally {
              setLoading(false);
            }
          }}
        >
          Maak gebruiker
        </Button>
      </div>
    </div>
  );
}
