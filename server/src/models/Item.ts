import { Schema, model, Types, Document } from "mongoose";

interface IItem extends Document {
  name: string;
  description?: string;
  borrowedBy?: Types.ObjectId | null;
  borrowedAt?: Date | null;
  returnedAt?: Date | null;
}

const itemSchema = new Schema<IItem>({
  name: { type: String, required: true },
  description: { type: String },
  borrowedBy: { type: Schema.Types.ObjectId, ref: "User", default: null },
  borrowedAt: { type: Date, default: null },
  returnedAt: { type: Date, default: null },
});

export default model<IItem>("Item", itemSchema);
