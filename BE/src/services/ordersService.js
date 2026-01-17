import ordersModel from '../models/ordersModel.js';
import * as orderItemService from './orderItemService.js';
import * as notificationService from './notificationServices.js';
import { getIO } from '../socket/socket.js';

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

    // Populate để lấy thông tin bàn
    const populatedOrder = await ordersModel.findById(newOrder._id).populate('tableId', 'number');

    // Tạo thông báo khi có đơn hàng mới
    try {
        const notification = await notificationService.createNotification({
            type: 'NEW_ORDER',
            title: `Đơn hàng mới - Bàn ${populatedOrder.tableId?.number || 'N/A'}`,
            message: `Bàn ${populatedOrder.tableId?.number || 'N/A'} vừa đặt ${pendingItemsWithoutOrder.length} món`,
            tableId: populatedOrder.tableId?._id,
            orderId: populatedOrder._id,
            status: 'UNREAD'
        });

        // Broadcast thông báo qua Socket.IO
        try {
            const io = getIO();
            io.emit('newNotification', notification);
        } catch (socketError) {
            console.error('Lỗi khi broadcast notification:', socketError);
        }
    } catch (notifError) {
        console.error('Lỗi khi tạo thông báo đơn hàng mới:', notifError);
        // Không throw error để không ảnh hưởng việc tạo order
    }

    return populatedOrder;
};

export const getAllOrders = async () => {
    return await ordersModel.find()
        .populate({
            path: 'orderItems',
            populate: {
                path: 'menuItemId',
                select: 'name'
            },
            select: 'quantity menuItemId price'
        })
        .populate('tableId', 'number')
        .sort({ createdAt: -1 });
};

export const getOrderById = async (id) => {
    return await ordersModel.findById(id)
        .populate({
            path: 'orderItems',
            populate: {
                path: 'menuItemId',
                select: 'name'
            },
            select: 'quantity menuItemId price'
        })
        .populate('tableId', 'number');
};

export const updateOrderStatus = async (id, status) => {
    const order = await ordersModel.findByIdAndUpdate(
        id,
        { status },
        { new: true }
    ).populate('tableId', 'number');

    // Tạo thông báo khi order chuyển sang trạng thái COMPLETED
    if (status === 'COMPLETED' && order) {
        try {
            const notification = await notificationService.createNotification({
                type: 'FOOD_READY',
                title: `Món ăn đã sẵn sàng - Bàn ${order.tableId?.number || 'N/A'}`,
                message: `Đơn hàng tại bàn ${order.tableId?.number || 'N/A'} đã hoàn thành và sẵn sàng phục vụ`,
                tableId: order.tableId?._id,
                orderId: order._id,
                status: 'UNREAD'
            });

            // Broadcast thông báo qua Socket.IO
            try {
                const io = getIO();
                io.emit('newNotification', notification);
            } catch (socketError) {
                console.error('Lỗi khi broadcast notification:', socketError);
            }
        } catch (notifError) {
            console.error('Lỗi khi tạo thông báo:', notifError);
            // Không throw error để không ảnh hưởng việc cập nhật status
        }
    }

    return order;
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
