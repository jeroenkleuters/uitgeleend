// client/src/components/ItemsPage.tsx
import { useEffect, useState } from "react";
import { getItems } from "../api/api";
import AddItem from "./AddItem";
import ItemList from "./ItemList";

export default function ItemsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const data = await getItems();
      // Zorg dat altijd een array wordt gezet
      setItems(Array.isArray(data) ? data : data.items || []);
    } catch (err) {
      console.error("Error fetching items:", err);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="space-y-6">
      <AddItem onItemAdded={fetchItems} />
      {loading ? (
        <p>Bezig met laden...</p>
      ) : (
        <ItemList items={items} onRefresh={fetchItems} />
      )}
    </div>
  );
}
