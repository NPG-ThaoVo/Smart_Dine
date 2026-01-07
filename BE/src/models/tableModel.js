import mongoose from "mongoose";
const tableSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
      lowercase: true,
    },
   number: {
      type: Number,
      required: true,
      unique: true,
    },
      currentSessionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Session",
      default: null,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
export default mongoose.model("Table", tableSchema);