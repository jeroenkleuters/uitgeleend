import { useEffect, useState } from "react"
import { getItems, borrowItem, returnItem } from "@/api/api"
import UserList from "./UserList"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Book, Music, Disc, Video, Shirt, Gamepad, Box, Wrench, User } from "lucide-react"

const typeIcons: Record<string, JSX.Element> = {
  boek: <Book className="w-5 h-5 text-blue-500" />,
  lp: <Music className="w-5 h-5 text-purple-500" />,
  cd: <Disc className="w-5 h-5 text-pink-500" />,
  DVD: <Video className="w-5 h-5 text-red-500" />,
  kledingstuk: <Shirt className="w-5 h-5 text-green-500" />,
  gereedschap: <Wrench className="w-5 h-5  text-blue-500" />,
  spel: <Gamepad className="w-5 h-5 text-yellow-500" />,
  anders: <Box className="w-5 h-5 text-gray-500" />,
}

interface Item {
  _id: string
  title: string
  type: string
  description?: string
  borrowedBy?: BorrowedBy | null
  borrowedAt?: string
}

interface BorrowedBy {
  _id: string
  name: string
  email: string
}

interface ItemListProps {
  selectedUserId?: string
}

export default function ItemList({ selectedUserId }: ItemListProps) {
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedUsers, setSelectedUsers] = useState<Record<string, string>>({});

  const fetchItems = async () => {
    try {
      const data = await getItems()
      setItems(data)
    
    } catch (err) {
      console.error("Error fetching items:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchItems()
  }, [])

  const handleBorrow = async (itemId: string, userId: string) => {
  try {
    await borrowItem(itemId, userId);
    fetchItems();
  } catch (err) {
    console.error("Error borrowing item", err);
  }
};

  const handleReturn = async (itemId: string) => {
    await returnItem(itemId)
    fetchItems()
  }

  if (loading) return <p>⏳ Items laden...</p>

  return (
    <div className="grid gap-3 md:grid-cols-2">
      {items.map((item) => (
        <Card key={item._id}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {typeIcons[item.type] || typeIcons["boek"]}
              {item.title} 
            </CardTitle>            
          </CardHeader>
          <CardContent>
            {item.borrowedBy ? (
              <>
                <p className="text-sm">
                  Dit {item.description} is op{" "}
                  {item.borrowedAt
                    ? new Date(item.borrowedAt).toLocaleDateString()
                    : "onbekend"}
                  <span> uitgeleend aan {item.borrowedBy.name || "onbekend"}</span>
                </p>
                <Button
                  className="mt-2 gap-2"
                  variant="destructive"
                  onClick={() => handleReturn(item._id)}
                >
                  Terugbrengen
                </Button>
              </>
            ) : (
              <>
                <p className="text-sm text-green-500">Beschikbaar</p>
                  <div className="grid gap-3 md:grid-cols-2">
                    <UserList
                      onSelect={(id: string) =>
                        setSelectedUsers((prev) => ({ ...prev, [item._id]: id }))
                      }
                    />

                    <Button
                      className="mt-2"
                      variant="destructive"
                      disabled={!selectedUsers[item._id]}
                      onClick={() => handleBorrow(item._id, selectedUsers[item._id])}
                    >
                      Uitlenen
                    </Button>
                  </div>
              </>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
