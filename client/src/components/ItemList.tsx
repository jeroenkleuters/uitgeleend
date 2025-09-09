// client/src/components/ItemList.tsx
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StarRating from "@/components/ui/StarRating";
import { borrowItem, returnItem } from "../api/api";
import {
  BookUser,
  Disc,
  Shirt,
  Gamepad2,
  FileQuestion,
  Film,
  Wrench,
} from "lucide-react";

interface Item {
  _id: string;
  title: string;
  description?: string;
  rating?: number;
  type: string;
  borrowedBy?: { _id: string; name: string; email: string } | null;
  borrowedAt?: string | null;
}

interface ItemListProps {
  items: Item[];
  disabled?: boolean;
  onRefresh?: () => Promise<void> | void;
}

const typeIcons: Record<string, JSX.Element> = {
  boek: <BookUser className="inline w-6 h-6 mr-2" />,
  cd: <Disc className="inline w-6 h-6 mr-2" />,
  lp: <Disc className="inline w-6 h-6 mr-2" />, // ✅ LP = Disc
  dvd: <Film className="inline w-6 h-6 mr-2" />,
  kledingstuk: <Shirt className="inline w-6 h-6 mr-2" />,
  spel: <Gamepad2 className="inline w-6 h-6 mr-2" />,
  gereedschap: <Wrench className="inline w-6 h-6 mr-2" />,
  anders: <FileQuestion className="inline w-6 h-6 mr-2" />,
};

export default function ItemList({ items, disabled = true, onRefresh }: ItemListProps) {
  const [loadingItem, setLoadingItem] = useState<string | null>(null);

  const handleBorrow = async (itemId: string) => {
    if (!confirm("Weet je zeker dat je dit item wilt uitlenen?")) return;
    setLoadingItem(itemId);
    try {
      // ⚠️ tijdelijk hardcoded testUserId – later ComboBox toevoegen
      const testUserId = "66f7d41a2d8b5e9e3c123456";
      await borrowItem(itemId, testUserId);
      if (onRefresh) await onRefresh();
    } catch (err) {
      console.error("Error borrowing item:", err);
    } finally {
      setLoadingItem(null);
    }
  };

  const handleReturn = async (itemId: string) => {
    if (!confirm("Item terugbrengen?")) return;
    setLoadingItem(itemId);
    try {
      await returnItem(itemId);
      if (onRefresh) await onRefresh();
    } catch (err) {
      console.error("Error returning item:", err);
    } finally {
      setLoadingItem(null);
    }
  };

  if (!items || items.length === 0) {
    return <p className="text-gray-500">Geen items gevonden.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {items.map((item) => (
        <Card key={item._id} className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center align-left">
              {typeIcons[item.type] || typeIcons["anders"]} {item.title} 
            </CardTitle>
          </CardHeader>
          <CardContent>
            {item.description && (
              <p className="text-sm text-gray-600">{item.description}</p>
            )}

            <div className="flex items-center space-x-2">
              <span>Rating:</span>
              <StarRating
                initialValue={item.rating || 0}  // toont huidige rating
                onChange={(val) => {
                  if (!disabled) {
                    console.log(`Nieuwe rating voor ${item.title}: ${val}`);
                    // later hier updateItem aanroepen
                  }
                }}
                disabled={disabled} // passed down prop
              />
            </div>

            {item.borrowedBy ? (
              <>
                <p className="text-sm">
                  Uitgeleend aan{" "}
                  <strong>{item.borrowedBy.name || "onbekend"}</strong>{" "}
                  {item.borrowedAt &&
                    `op ${new Date(item.borrowedAt).toLocaleDateString()}`}
                </p>
                <Button
                  className="mt-2 gap-2"
                  variant="destructive"
                  disabled={loadingItem === item._id}
                  onClick={() => handleReturn(item._id)}
                >
                  {loadingItem === item._id ? "Bezig..." : "Terugbrengen"}
                </Button>
              </>
            ) : (
              <>
                <p className="text-sm text-green-500">Beschikbaar</p>
                <Button
                  className="mt-2"
                  variant="destructive"
                  disabled={loadingItem === item._id}
                  onClick={() => handleBorrow(item._id)}
                >
                  {loadingItem === item._id ? "Bezig..." : "Uitlenen"}
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      ))}

      {onRefresh && (
        <div className="col-span-full flex justify-center">
          <Button variant="destructive" onClick={onRefresh}>↻ Lijst verversen</Button>
        </div>
      )}
    </div>
  );
}
