import { useState } from "react";
import { createItem } from "../api/api";

export default function AddItem({ onAdd }: { onAdd: () => void }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return alert("Naam is verplicht");
    await createItem(name, description);
    setName("");
    setDescription("");
    onAdd();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        className="border p-1 mr-2"
        placeholder="Item naam"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        className="border p-1 mr-2"
        placeholder="Beschrijving"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <button className="px-2 py-1 bg-purple-500 text-white rounded">Toevoegen</button>
    </form>
  );
}
