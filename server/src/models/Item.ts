import { Schema, model, Document, Types } from "mongoose"

export interface IItem extends Document {
  title: string
  type: string
  description: string
  rating?: number // 1 t/m 5
  photo?: string
  borrowedBy: Types.ObjectId | null
  borrowedAt: Date | null
}

const itemSchema = new Schema<IItem>(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    rating: { type: Number, min: 1, max: 5, default: null },
    photo: { type: String, default: null },
    type: {
      type: String,
      required: true,
      enum: ["boek", "lp", "cd", "dvd", "kledingstuk", "spel", "gereedschap", "anders"], // dropdown opties
    },
    borrowedBy: { type: Schema.Types.ObjectId, ref: "User", default: null },
    borrowedAt: { type: Date, default: null },
  },
  { timestamps: true }
)

export const Item = model<IItem>("Item", itemSchema)
