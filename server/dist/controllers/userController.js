"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.getUsers = void 0;
const User_1 = __importDefault(require("../models/User"));
const getUsers = async (req, res) => {
    try {
        const users = await User_1.default.find();
        res.json(users);
    }
    catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.getUsers = getUsers;
const createUser = async (req, res) => {
    try {
        const { name, email } = req.body;
        if (!name || !email) {
            return res.status(400).json({ error: 'Name and email are required' });
        }
        const user = new User_1.default({ name, email });
        await user.save();
        res.status(201).json(user);
    }
    catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.createUser = createUser;
