import ItemsPage from "./components/ItemsPage"

export default function App() {

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <h1 className="text-3xl font-bold mb-6">📚 Uitgeleend</h1>
      <ItemsPage />     
    </div>
  )
}