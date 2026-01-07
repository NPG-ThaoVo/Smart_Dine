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
      trim: true,
    },
    price: {
      type: Number,
      required: true,
       min: [1, "Price must be greater than 0"],
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    image: {
      type: String,
      default: "default.jpg",
      required: true,
    },
    upsellSuggestions: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);
menuItemSchema.index({ categoryId: 1, isAvailable: 1 });
export default mongoose.model("MenuItem", menuItemSchema);
