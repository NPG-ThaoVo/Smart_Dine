import mongoose from "mongoose";
const orderSchema = new mongoose.Schema(
  {
    orderItems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "OrderItem",
      },
    ],
    tableId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Table",
      required: true,
    },
    note: {
      type: String,
      default: null,
      trim: true,
    },
    status: {
      type: String,
      enum: ["PENDING", "COMPLETED", "CONFIRMED", "CANCELLED"],
      default: "PENDING",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
