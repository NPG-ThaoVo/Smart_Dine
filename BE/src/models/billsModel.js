import mongoose from "mongoose";
const billSchema = new mongoose.Schema(
    {
        sessionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Session",
            required: true,
        },
        totalAmount: {
            type: Number,
            required: true,
             min: 0,
        },      
        status: {
            type: String,
            enum: ["UNPAID", "PAID"],
            default: "UNPAID",
            required: true,
        },
    },
    { timestamps: true }
);
export default mongoose.model("Bill", billSchema);
