import ordersModel from '../models/ordersModel.js';

export const createOrder = async (data) => {
    return await ordersModel.create(data);
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

export const getOrdersByTableId = async (id) => {
    return await ordersModel.find({ id });
};


export const getOrdersBySessionId = async (id) => {
    return await ordersModel.find({ sessionId: id });
}   
