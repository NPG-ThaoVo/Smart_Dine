import mongoose from "mongoose";
const tableSchema = new mongoose.Schema(
  {
    name: {
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
      // ref: "Session",
      default: null,
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

tableSchema.virtual("status").get(function () {
  return this.currentSessionId ? "OCCUPIED" : "EMPTY";
});

tableSchema.set("toJSON", { virtuals: true });
tableSchema.set("toObject", { virtuals: true });
export default mongoose.model("Table", tableSchema);
