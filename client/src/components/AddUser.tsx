import { useState } from "react";
import { createUser } from "../api/api";

export default function AddUser({ onAdd }: { onAdd: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return alert("Naam en e-mail zijn verplicht");
    await createUser(name, email);
    setName("");
    setEmail("");
    onAdd();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
      <input
        className="border p-1"
        placeholder="Naam"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        className="border p-1"
        placeholder="E-mail"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <button className="px-3 py-1 bg-green-600 text-white rounded">Toevoegen</button>
    </form>
  );
}
