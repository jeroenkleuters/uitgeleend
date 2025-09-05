import { Schema, model, Document, Types } from "mongoose"

export interface IItem extends Document {
  title: string
  type: string
  borrowedBy: Types.ObjectId | null
  borrowedAt: Date | null
}

const itemSchema = new Schema<IItem>(
  {
    title: { type: String, required: true },
     type: {
      type: String,
      required: true,
      enum: ["boek", "lp", "cd", "dvd", "kledingstuk", "spel"], // dropdown opties
    },
    borrowedBy: { type: Types.ObjectId, ref: "User", default: null },
    borrowedAt: { type: Date, default: null },
  },
  { timestamps: true }
)

export const Item = model<IItem>("Item", itemSchema)
