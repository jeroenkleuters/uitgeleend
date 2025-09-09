// client/src/components/AddItem.tsx
import { useState } from "react";
import { createItem } from "../api/api"; // zelfde api as in ItemsPage
import UserSelect from "./UserSelect";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

/**
 * onItemAdded kan een async functie zijn (zoals fetchItems in ItemsPage)
 */
export default function AddItem({
  onItemAdded,
}: {
  onItemAdded?: () => Promise<void> | void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState(""); // verplicht: controle bij submit
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setType("");
    setSelectedUser(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !type) {
      alert("Titel en type zijn verplicht.");
      return;
    }

    setLoading(true);
    try {
      await createItem({
        title,
        description,
        type,
        borrowedBy: selectedUser ?? null,
      });

      // roep callback aan zodat parent (ItemsPage) de lijst kan verversen
      if (onItemAdded) await onItemAdded();

      resetForm();
    } catch (err) {
      console.error("Fout bij maken item:", err);
      alert("Er ging iets mis bij het toevoegen van het item. Kijk de console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-card rounded">
      <h3 className="text-lg font-semibold">Nieuw item</h3>

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
        <select
          className="w-full border rounded p-2"
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
        >
          <option value="">-- Kies type --</option>
          <option value="boek">Boek</option>
          <option value="lp">LP</option>
          <option value="cd">CD</option>
          <option value="dvd">DVD</option>
          <option value="kledingstuk">Kledingstuk</option>
          <option value="spel">Spel</option>
          <option value="gereedschap">Gereedschap</option>
          <option value="anders">Anders</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Uitgeleend aan</label>
        <UserSelect value={selectedUser} onChange={(id) => setSelectedUser(id)} />
      </div>

      <div className="flex justify-end">
        <Button type="submit" variant="destructive" disabled={loading}>
          {loading ? "Bezig..." : "Toevoegen"}
        </Button>
      </div>
    </form>
  );
}
