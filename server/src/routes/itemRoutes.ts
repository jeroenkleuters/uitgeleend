import { Router } from "express"
import {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
  borrowItem,
  returnItem,
} from "../controllers/itemController"

const router = Router()

// CRUD
router.get("/", getItems)
router.get("/:id", getItemById)
router.post("/", createItem)
router.put("/:id", updateItem)
router.delete("/:id", deleteItem)

// Borrow / Return
router.post("/:id/borrow", borrowItem)
router.post("/:id/return", returnItem)

export default router
