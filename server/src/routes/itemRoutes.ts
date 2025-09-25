import fs from "fs";
import { Router } from "express";
import multer from "multer";
import path, {join}  from "path";
import {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
  borrowItem,
  returnItem,
} from "../controllers/itemController";

const router = Router();

// Multer config voor uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // map binnen project root
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// CRUD
router.get("/", getItems);
router.get("/:id", getItemById);
router.post("/", createItem);
router.put("/:id", updateItem);
router.delete("/:id", deleteItem);

// Borrow / Return
router.post("/:id/borrow", borrowItem);
router.post("/:id/return", returnItem);

// ✅ Foto upload
router.post("/:id/photo", upload.single("photo"), async (req, res) => {
  try {
    const itemId = req.params.id;
    const Item = (await import("../models/Item")).Item;
    const item = await Item.findById(itemId);
    if (!item) return res.status(404).json({ message: "Item not found" });

    item.photo = `uploads/${req.file?.filename}`;
    await item.save();

    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error uploading photo", error: err });
  }
});

// Foto ophalen
router.get("/:id/photo", async (req, res) => {
  try {
    const Item = (await import("../models/Item")).Item;
    const item = await Item.findById(req.params.id);
    if (!item || !item.photo) {
      return res.status(404).json({ message: "Foto niet gevonden" });
    }

    const photoPath = join(process.cwd(), item.photo); 

    if (!fs.existsSync(photoPath)) {
      return res.status(404).json({ message: "Foto bestand niet gevonden" });
    }

    res.sendFile(photoPath);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Fout bij ophalen foto", error: err });
  }
});

export default router;
