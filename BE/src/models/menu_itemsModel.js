import mongoose from "mongoose";
const menuItemSchema = new mongoose.Schema(
  {
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["ACTIVE", "HIDDEN"],
      default: "ACTIVE",
    },
    price: {
      type: Number,
      required: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    image: {
      type: String,
      default: "default.jpg",
    },
    upsellSuggestions: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);
export default mongoose.model("MenuItem", menuItemSchema);
