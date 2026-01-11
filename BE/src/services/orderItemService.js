import orderItemModel from "../models/orderItemModel.js";

export const getOrderItemsByOrderId = async (orderId) => {
  return await orderItemModel.find({ orderId });
};

export const updateOrderItemStatus = async (id, status) => {
  return await orderItemModel.findByIdAndUpdate(id, { status }, { new: true });
};
