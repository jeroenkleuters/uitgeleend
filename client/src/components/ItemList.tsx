import { useEffect, useState } from "react"
import { getItems, borrowItem, returnItem } from "@/api/api"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Book, Music, Disc, Video, Shirt, Gamepad, Box } from "lucide-react"

const typeIcons: Record<string, JSX.Element> = {
  boek: <Book className="w-5 h-5 text-blue-500" />,
  lp: <Music className="w-5 h-5 text-purple-500" />,
  cd: <Disc className="w-5 h-5 text-pink-500" />,
  DVD: <Video className="w-5 h-5 text-red-500" />,
  kledingstuk: <Shirt className="w-5 h-5 text-green-500" />,
  spel: <Gamepad className="w-5 h-5 text-yellow-500" />,
  anders: <Box className="w-5 h-5 text-gray-500" />,
}

const typeColors: Record<string, string> = {
  boek: "bg-blue-100 text-blue-700",
  lp: "bg-purple-100 text-purple-700",
  cd: "bg-pink-100 text-pink-700",
  DVD: "bg-red-100 text-red-700",
  kledingstuk: "bg-green-100 text-green-700",
  spel: "bg-yellow-100 text-yellow-700",
  anders: "bg-gray-100 text-gray-700",
}

interface Item {
  _id: string
  name: string
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
  const [borrowerNames, setBorrowerNames] = useState<{ [key: string]: string }>({})

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

  const handleBorrow = async (itemId: string) => {
    if (!selectedUserId) return
    await borrowItem(itemId, selectedUserId)
    fetchItems()
  }

  const handleReturn = async (itemId: string) => {
    await returnItem(itemId)
    fetchItems()
  }

  if (loading) return <p>⏳ Items laden...</p>

  return (
    <div className="grid gap-3">
      {items.map((item) => (
        <Card key={item._id}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {typeIcons[item.type] || typeIcons["boek"]}
              {item.name} 
            </CardTitle>            
          </CardHeader>
          <CardContent>
            {item.borrowedBy ? (
              <>
                <p className="text-sm">Dit {item.description} is op &nbsp;
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
                {/* <Button
                  className="mt-2"
                  variant="destructive"
                  // onClick={() => handleReturn(item._id)}
                >
                  Terugvragen
                </Button> */}
              </>
            ) : (
              <>
                <p className="text-sm text-green-500">Beschikbaar</p>
                <Button
                  className="mt-2"
                  disabled={!selectedUserId}
                  onClick={() => handleBorrow(item._id)}
                >
                  Uitlenen
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
