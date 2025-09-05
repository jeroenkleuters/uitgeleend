import { useEffect, useState } from "react"
import { getItems, getUserById, borrowItem, returnItem } from "@/api/api"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Item {
  _id: string
  name: string
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
      // // Fetch borrower names for borrowed items
      // const borrowedItems = data.filter((item: Item) => item.borrowedBy)
      // const names: { [key: string]: string } = {}
      // await Promise.all(
      //   borrowedItems.map(async (item: Item) => {
      //     if (item.borrowedBy) {
      //       try {
      //         debugger;
      //           console.log("Fetching user by ID:", selectedUserId as string);
      //         const user = await getUserById(selectedUserId as string)
      //         names[item._id] = user?.name || "onbekend"
      //       } catch {
      //         names[item._id] = "onbekend"
      //       }
      //     }
      //   })
      // )
      // setBorrowerNames(names)
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
            <CardTitle>{item.name}</CardTitle>
          </CardHeader>
          <CardContent>
            {item.borrowedBy ? (
              <>
                <p className="text-sm text-red-500">
                  <span>Uitgeleend op{" "}
                  {item.borrowedAt
                    ? new Date(item.borrowedAt).toLocaleDateString()
                    : "onbekend"}</span>
                    <span> aan {item.borrowedBy.name || "onbekend"}</span>
                </p>
                <Button
                  className="mt-2"
                  variant="destructive"
                  onClick={() => handleReturn(item._id)}
                >
                  Terugbrengen
                </Button>
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
