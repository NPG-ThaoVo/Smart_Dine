import ordersModel from '../models/ordersModel.js';
import * as orderItemService from './orderItemService.js';

export const createOrder = async (data) => {
    const { tableId } = data;

    // Tạo Order trước
    const newOrder = await ordersModel.create(data);

    // Lấy tất cả OrderItems của bàn (chưa có orderId)
    const pendingItems = await orderItemService.getOrderItemsByTableId(tableId);
    const pendingItemsWithoutOrder = pendingItems.filter(item => !item.orderId);

    if (pendingItemsWithoutOrder.length > 0) {
        // Link các OrderItems vào Order
        await orderItemService.linkOrderItemsToOrder(tableId, newOrder._id);

        // Cập nhật orderItems array trong Order
        newOrder.orderItems = pendingItemsWithoutOrder.map(item => item._id);
        await newOrder.save();
    }

    return newOrder;
};

export const getAllOrders = async () => {
    return await ordersModel.find();
};

export const getOrderById = async (id) => {
    return await ordersModel.findById(id);
};

export const updateOrderStatus = async (id, status) => {
    return await ordersModel.findByIdAndUpdate(
        id,
        { status },
        { new: true }
    );
};

export const getOrdersByTableId = async (orderId, status) => {
    return await ordersModel.findByIdAndDelete(
        orderId,
        { status },
        { new: true }
    );
};


export const getOrdersBySessionId = async (sessionId) => {
    return await ordersModel.find({ sessionId });
}   
