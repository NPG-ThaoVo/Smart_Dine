import mongoose from "mongoose";
const notificationSchema = new mongoose.Schema(
    {
      type: {
            type: String,
            enum: ["NEW_ORDER", "SERVICE_REQUEST","FOOD_READY"],
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        tableId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Table",
            default: null,
        },
        orderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
            default: null,
        },
        status: {
            type: String,
            enum: ["UNREAD", "READ"],
            default: "UNREAD",
            required: true,
        },
    },
    { timestamps: true }
);
export default mongoose.model("Notification", notificationSchema);
