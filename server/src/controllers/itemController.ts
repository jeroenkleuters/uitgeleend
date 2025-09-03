import { Request, Response } from "express";
import Item from "../models/Item";

export const getItems = async (req: Request, res: Response) => {
  try {
    const items = await Item.find().populate("borrowedBy", "name email");
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

export const createItem = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    const item = new Item({ name, description });
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

export const borrowItem = async (req: Request, res: Response) => {
  try {
    const { itemId, userId } = req.body;
    const item = await Item.findById(itemId);
    if (!item) return res.status(404).json({ error: "Item not found" });

    if (item.borrowedBy) return res.status(400).json({ error: "Item already borrowed" });

    item.borrowedBy = userId;
    item.borrowedAt = new Date();
    item.returnedAt = null;

    await item.save();
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

export const returnItem = async (req: Request, res: Response) => {
  try {
    const { itemId } = req.body;
    const item = await Item.findById(itemId);
    if (!item) return res.status(404).json({ error: "Item not found" });

    if (!item.borrowedBy) return res.status(400).json({ error: "Item is not borrowed" });

    item.returnedAt = new Date();
    item.borrowedBy = null;
    item.borrowedAt = null;

    await item.save();
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};