import { useState } from "react";
import UserList from "./components/UserList";
import ItemList from "./components/ItemList";
import AddItem from "./components/AddItem";
import AddUser from "./components/AddUser";

function App() {
  const [selectedUserId, setSelectedUserId] = useState<string | undefined>(undefined);
  const [refresh, setRefresh] = useState(false);

  const triggerRefresh = () => setRefresh(!refresh);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Uitgeleend 📚</h1>

      <h2 className="text-lg font-semibold mb-2">Gebruikers</h2>
      <AddUser onAdd={triggerRefresh} />
      <UserList onSelect={setSelectedUserId} key={refresh.toString()} />

      <h2 className="text-lg font-semibold mt-6 mb-2">Items</h2>
      <AddItem onAdd={triggerRefresh} />
      <ItemList selectedUserId={selectedUserId} key={refresh.toString()} />
    </div>
  );
}

export default App;
