"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const itemSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String },
    borrowedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", default: null },
    borrowedAt: { type: Date, default: null },
    returnedAt: { type: Date, default: null },
});
exports.default = (0, mongoose_1.model)("Item", itemSchema);
