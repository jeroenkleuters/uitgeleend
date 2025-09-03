import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import itemRoutes from "./routes/itemRoutes";
import { connectDB } from "./config/db";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

connectDB(process.env.MONGO_URI || "");

app.use("/api/users", userRoutes);
app.use("/api/items", itemRoutes);

app.get("/", (req, res) => res.send("API running for Uitgeleend 📚"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));