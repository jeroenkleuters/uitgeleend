import { Request, Response } from "express"
import { Item } from "../models/Item"
import { User } from "../models/User"

// ✅ Alle items ophalen
export const getItems = async (req: Request, res: Response) => {
  try {
    const items = await Item.find()
      .populate("borrowedBy", "name email") // alleen user naam + email
      .exec()
    res.json(items)
  } catch (err) {
    res.status(500).json({ message: "Error fetching items", error: err })
  }
}

// ✅ Eén item ophalen
export const getItemById = async (req: Request, res: Response) => {
  try {
    const item = await Item.findById(req.params.id)
      .populate("borrowedBy", "name email")
      .exec()
    if (!item) return res.status(404).json({ message: "Item not found" })
    res.json(item)
  } catch (err) {
    res.status(500).json({ message: "Error fetching item", error: err })
  }
}

// ✅ Nieuw item toevoegen
export const createItem = async (req: Request, res: Response) => {
  try {
    const { title, type } = req.body
    const item = new Item({ title, type })
    await item.save()
    res.status(201).json(item)
  } catch (err) {
    res.status(400).json({ message: "Error creating item", error: err })
  }
}

// ✅ Item bijwerken
export const updateItem = async (req: Request, res: Response) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .populate("borrowedBy", "name email")
      .exec()

    if (!item) return res.status(404).json({ message: "Item not found" })
    res.json(item)
  } catch (err) {
    res.status(400).json({ message: "Error updating item", error: err })
  }
}

// ✅ Item verwijderen
export const deleteItem = async (req: Request, res: Response) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id)
    if (!item) return res.status(404).json({ message: "Item not found" })
    res.json({ message: "Item deleted" })
  } catch (err) {
    res.status(500).json({ message: "Error deleting item", error: err })
  }
}

// ✅ Item uitlenen
export const borrowItem = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body
    const item = await Item.findById(req.params.id)

    if (!item) return res.status(404).json({ message: "Item not found" })
    if (item.borrowedBy)
      return res.status(400).json({ message: "Item already borrowed" })

    const user = await User.findById(userId).exec()
    if (!user) return res.status(404).json({ message: "User not found" })

    item.borrowedBy = user._id as import("mongoose").Types.ObjectId
    item.borrowedAt = new Date()
    await item.save()

    const populatedItem = await item.populate("borrowedBy", "name email")
    res.json(populatedItem)
  } catch (err) {
    res.status(400).json({ message: "Error borrowing item", error: err })
  }
}

// ✅ Item terugbrengen
export const returnItem = async (req: Request, res: Response) => {
  try {
    const item = await Item.findById(req.params.id)

    if (!item) return res.status(404).json({ message: "Item not found" })
    if (!item.borrowedBy)
      return res.status(400).json({ message: "Item is not borrowed" })

    item.borrowedBy = null
    item.borrowedAt = null
    await item.save()

    res.json(item)
  } catch (err) {
    res.status(400).json({ message: "Error returning item", error: err })
  }
}
