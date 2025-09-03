import { Schema, model } from "mongoose";

const itemSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  borrowedBy: { type: Schema.Types.ObjectId, ref: "User", default: null },
  borrowedAt: { type: Date, default: null },
  returnedAt: { type: Date, default: null }
});

export default model("Item", itemSchema);