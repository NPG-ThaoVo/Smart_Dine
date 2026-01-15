import api from "./index";


export const createOrder = async (orderData) => {
  return await api.post("/orders", orderData);
};


export const getOrderById = async (orderId) => {
  return await api.get(`/orders/${orderId}`);
};


export const getAllOrders = async () => {
  return await api.get("/orders");
};


export const updateOrderStatus = async (orderId, status) => {
  return await api.patch(`/orders/${orderId}/status`, { status });
};

export const getOrdersByTable = async (tableId) => {
  return await api.get(`/orders/table/${tableId}`);
};
