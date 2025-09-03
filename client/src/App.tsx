import { useState } from "react";
import UserList from "./components/UserList";
import ItemList from "./components/ItemList";
import AddItem from "./components/AddItem";

function App() {
  const [selectedUserId, setSelectedUserId] = useState<string | undefined>(undefined);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Uitgeleend 📚</h1>
      <div className="mb-4">
        <label>Selecteer gebruiker: </label>
        <input
          type="text"
          placeholder="Vul userId in"
          className="border p-1 ml-2"
          value={selectedUserId || ""}
          onChange={e => setSelectedUserId(e.target.value)}
        />
      </div>

      <AddItem onAdd={() => {}} />

      <div className="flex gap-10">
        <UserList />
        <ItemList selectedUserId={selectedUserId} />
      </div>
    </div>
  );
}

export default App;
