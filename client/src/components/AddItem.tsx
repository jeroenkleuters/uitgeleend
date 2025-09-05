import { useState } from "react";
import { createItem } from "../api/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


export default function AddItem({ onAdd }: { onAdd: () => void }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("boek")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return alert("Naam is verplicht");
    await createItem(name, description);
    setName("");
    setType("boek");
    setDescription("");
    onAdd();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white shadow rounded">
      <div>
        <label className="block text-sm font-medium">Titel</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Type</label>
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
            <SelectItem value="anders">Anders</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Toevoegen
      </button>
    </form>
  );
}
