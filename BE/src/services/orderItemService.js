import orderItemModel from "../models/orderItemModel.js";

export const getOrderItemsByOrderId = async (orderId) => {
  return await orderItemModel.find({ orderId });
};

export const updateOrderItemStatus = async (id, status) => {
  return await orderItemModel.findByIdAndUpdate(id, { status }, { new: true });
};

//add order items 
export const addOrderItems = async (payload) => {
  // payload exemple:
  //   {
  //     "tableId": "695ea817fc00e87d2bc7a7b4",
  //     "orderItems": [
  //         {
  //             "menuItemId": "6964dec23f6e7b42fc078011",
  //             "quantity": 2,
  //             "price": 50000
  //         },
  //         {
  //             "menuItemId": "6964df043f6e7b42fc078016",
  //             "quantity": 1,
  //             "price": 50000
  //         }
  //     ]
  // }
  const { tableId, orderItems } = payload;

  // Thêm tableId vào từng order item
  const itemsWithTableId = orderItems.map(item => ({
    ...item,
    tableId,
    orderId: null // Chưa có order, sẽ cập nhật sau khi chốt đơn
  }));

  const createdOrderItems = await orderItemModel.insertMany(itemsWithTableId);
  return createdOrderItems;
};

export const getOrderItemsByTableId = async (tableId) => {
  return await orderItemModel.find({ tableId });
};

export const linkOrderItemsToOrder = async (tableId, orderId) => {
  // Cập nhật tất cả OrderItems của bàn (chưa có orderId) 
  // → gán orderId vào
  return await orderItemModel.updateMany(
    { tableId, orderId: null },
    { orderId }
  );
};