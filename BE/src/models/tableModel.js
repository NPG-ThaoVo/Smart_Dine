import mongoose from "mongoose";
const tableSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    number: {
      type: Number,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ["open", "close"],
      default: "open",
      required: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Table", tableSchema);
