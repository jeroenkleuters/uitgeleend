import { useEffect, useState } from "react";
import { getItems, borrowItem, returnItem } from "../api/api";

export default function ItemList({ selectedUserId }: { selectedUserId?: string }) {
  const [items, setItems] = useState<any[]>([]);

  const loadItems = () => getItems().then(setItems);

  useEffect(() => { loadItems(); }, []);

  const handleBorrow = (itemId: string) => {
    if (!selectedUserId) return alert("Selecteer eerst een gebruiker!");
    borrowItem(itemId, selectedUserId).then(loadItems);
  };

  const handleReturn = (itemId: string) => {
    returnItem(itemId).then(loadItems);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Items</h2>
      <ul className="list-disc pl-5">
        {items.map(item => (
          <li key={item._id} className="mb-1">
            {item.name} - {item.borrowedBy ? `geleend door ${item.borrowedBy.name}` : "beschikbaar"}
            {!item.borrowedBy && selectedUserId && (
              <button
                className="ml-2 px-2 py-1 bg-blue-500 text-white rounded"
                onClick={() => handleBorrow(item._id)}
              >
                Lenen
              </button>
            )}
            {item.borrowedBy && (
              <button
                className="ml-2 px-2 py-1 bg-green-500 text-white rounded"
                onClick={() => handleReturn(item._id)}
              >
                Terugbrengen
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
