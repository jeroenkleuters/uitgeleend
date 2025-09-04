import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"

// Routes
import userRoutes from "./routes/userRoutes"
import itemRoutes from "./routes/itemRoutes"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
const MONGO_URI = process.env.MONGO_URI || ""

// Middleware
app.use(cors({ origin: "http://localhost:5173" })) // frontend toegang
app.use(express.json())

// Root route
app.get("/", (req, res) => {
  res.send("📚 Uitgeleend backend is running!")
})

// API routes
app.use("/api/users", userRoutes)
app.use("/api/items", itemRoutes)

// Catch-all 404
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" })
})

// Connect MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err))

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})
