import mongoose from "mongoose";
const sessionSchema = new mongoose.Schema(
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
    status: {
      type: String,
      enum: ["ACTIVE", "CLOSED"],
      default: "ACTIVE",
      required: true,
    },
    openAt: {
      type: Date,
      required: true,
    },
    closeAt: {
      type: Date,
      default: null,
    },
  },
);
export default mongoose.model("Session", sessionSchema);
