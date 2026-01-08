import mongoose from "mongoose";

const tableSchema = new mongoose.Schema(
  {
    number: {
      type: Number,
      required: true,
      unique: true, 
    },

    name: {
      type: String,
      default: "",
    },

    currentSessionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Session",
      default: null,
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

const Table = mongoose.model("Table", tableSchema);
export default Table;