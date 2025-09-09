// client/src/components/AddItem.tsx
import { useEffect, useState } from "react";
import { createItem, getUsers, createUser } from "@/api/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type User = { _id: string; name: string; email: string };

export default function AddItem({ onItemAdded }: { onItemAdded: () => void }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("boek");

  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>(""); // userId or "" or "new"
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data || []);
    } catch (err) {
      console.error("Failed to load users:", err);
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setType("boek");
    setSelectedUser("");
    setIsAddingUser(false);
    setNewUserName("");
    setNewUserEmail("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      let borrowedBy: string | undefined | null = null;

      if (isAddingUser) {
        // create new user first
        if (!newUserName || !newUserEmail) {
          alert("Vul naam en e-mail in voor de nieuwe gebruiker.");
          setLoading(false);
          return;
        }
        const created = await createUser(newUserName, newUserEmail);
        borrowedBy = created._id;
        // refresh users list so dropdown stays up-to-date
        await fetchUsers();
      } else if (selectedUser) {
        borrowedBy = selectedUser;
      }

      await createItem({
        title,
        description,
        type,
        borrowedBy: borrowedBy ?? null,
      });

      resetForm();
      onItemAdded();
    } catch (err) {
      console.error("Error creating item:", err);
      alert("Fout bij toevoegen item. Kijk console voor details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-card rounded">
      <div>
        <label className="block text-sm font-medium mb-1">Titel</label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Bijv. Boormachine"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Beschrijving</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded resize-y"
          rows={3}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Type</label>
        <Select value={type} onValueChange={setType}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Kies een type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="boek">Boek</SelectItem>
            <SelectItem value="lp">LP</SelectItem>
            <SelectItem value="cd">CD</SelectItem>
            <SelectItem value="DVD">DVD</SelectItem>
            <SelectItem value="kledingstuk">Kledingstuk</SelectItem>
            <SelectItem value="spel">Spel</SelectItem>
            <SelectItem value="gereedschap">Gereedschap</SelectItem>
            <SelectItem value="anders">Anders</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Uitlenen aan</label>

        {!isAddingUser ? (
          <Select
            value={selectedUser}
            onValueChange={(val) =>
              val === "new"
                ? setIsAddingUser(true)
                : setSelectedUser(val === "none" ? "" : val)
            }
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
                onClick={async () => {
                  // quick create user without submitting the whole form
                  if (!newUserName || !newUserEmail) {
                    alert("Vul naam en e-mail in voor de nieuwe gebruiker.");
                    return;
                  }
                  setLoading(true);
                  try {
                    const created = await createUser(newUserName, newUserEmail);
                    // select newly created user and stop add-user mode
                    setSelectedUser(created._id);
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
        )}
      </div>

      <div className="flex justify-end">
        <Button type="submit" variant="destructive" disabled={loading}>
          {loading ? "Bezig..." : "Toevoegen"}
        </Button>
      </div>
    </form>
  );
}
