import { useEffect, useState } from "react"
import AddItem from "./AddItem"
import ItemList from "./ItemList"
import { getItems } from "../api/api"

interface Item {
  _id: string
  title: string
  type: string
  borrowedBy?: {
    _id: string
    name: string
    email: string
  } | null
}

const ItemsPage = () => {
  const [items, setItems] = useState<Item[]>([])

  const fetchItems = async () => {
    try {
      const data = await getItems()
      setItems(data)
    } catch (err) {
      console.error("Error fetching items:", err)
    }
  }

  useEffect(() => {
    fetchItems()
  }, [])

  return (
    <div className="p-6 space-y-6">
      {/* Formulier om nieuw item toe te voegen */}
      <AddItem onItemAdded={fetchItems} />

      {/* Lijst met items */}
      <ItemList />
    </div>
  )
}

export default ItemsPage
