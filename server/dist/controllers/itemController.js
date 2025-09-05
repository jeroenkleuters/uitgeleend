"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnItem = exports.borrowItem = exports.createItem = exports.getItems = void 0;
const Item_1 = __importDefault(require("../models/Item"));
const getItems = async (req, res) => {
    try {
        const items = await Item_1.default.find().populate("borrowedBy", "name email");
        res.json(items);
    }
    catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};
exports.getItems = getItems;
const createItem = async (req, res) => {
    try {
        const { name, description } = req.body;
        const item = new Item_1.default({ name, description });
        await item.save();
        res.status(201).json(item);
    }
    catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};
exports.createItem = createItem;
const borrowItem = async (req, res) => {
    try {
        const { itemId, userId } = req.body;
        const item = await Item_1.default.findById(itemId);
        if (!item)
            return res.status(404).json({ error: "Item not found" });
        if (item.borrowedBy)
            return res.status(400).json({ error: "Item already borrowed" });
        item.borrowedBy = userId;
        item.borrowedAt = new Date();
        item.returnedAt = new Date();
        await item.save();
        res.json(item);
    }
    catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};
exports.borrowItem = borrowItem;
const returnItem = async (req, res) => {
    try {
        const { itemId } = req.body;
        const item = await Item_1.default.findById(itemId);
        if (!item)
            return res.status(404).json({ error: "Item not found" });
        if (!item.borrowedBy)
            return res.status(400).json({ error: "Item is not borrowed" });
        item.returnedAt = new Date();
        item.borrowedBy = null;
        item.borrowedAt = null;
        await item.save();
        res.json(item);
    }
    catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};
exports.returnItem = returnItem;
