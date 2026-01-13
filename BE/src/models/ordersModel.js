import mongoose from "mongoose";
const orderSchema = new mongoose.Schema(
  {
    tableId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Table",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
     note: {
      type: String,
      default: null,
      trim: true,
    },
     status: {
      type: String,
      enum: ["PENDING", "COMPLETED","CONFIRMED","CANCELLED"],
      default: "PENDING",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);