import { useState } from "react"
import UserList from "@/components/UserList"
import ItemList from "@/components/ItemList"

export default function App() {
  const [selectedUserId, setSelectedUserId] = useState<string | undefined>()

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <h1 className="text-3xl font-bold mb-6">📚 Uitgeleend</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl mx-auto">
        {/* Users */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Gebruikers</h2>
          <UserList onSelect={setSelectedUserId} />
        </div>

        {/* Items */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Items</h2>
          <ItemList selectedUserId={selectedUserId} />
        </div>
      </div>
    </div>
  )
}