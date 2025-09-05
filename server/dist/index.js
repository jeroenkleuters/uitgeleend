"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
// Routes
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const itemRoutes_1 = __importDefault(require("./routes/itemRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "";
// Middleware
app.use((0, cors_1.default)({ origin: "http://localhost:5173" })); // frontend toegang
app.use(express_1.default.json());
// Root route
app.get("/", (req, res) => {
    res.send("📚 Uitgeleend backend is running!");
});
// API routes
app.use("/api/users", userRoutes_1.default);
app.use("/api/items", itemRoutes_1.default);
// Catch-all 404
app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});
// Connect MongoDB
mongoose_1.default
    .connect(MONGO_URI)
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));
// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
