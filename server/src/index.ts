import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import path from "path";

import itemRoutes from "./routes/itemRoutes"
import userRoutes from "./routes/userRoutes"

dotenv.config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Static folder voor foto’s
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Routes
app.use("/api/items", itemRoutes)
app.use("/api/users", userRoutes)



// MongoDB connectie
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log("✅ MongoDB connected")
    app.listen(5000, () => console.log("🚀 Server running on port 5000"))
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err))
