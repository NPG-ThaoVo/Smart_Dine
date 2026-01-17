import api from "./index";


export const addOrderItems = async (data) => {
  return await api.post("/order-items", data);
};


export const getOrderItemsByOrder = async (orderId) => {
  return await api.get(`/order-items/order/${orderId}`);
};


export const getOrderItemsByTable = async (tableId) => {
  return await api.get(`/order-items/table/${tableId}`);
};

export const updateOrderItemStatus = async (itemId, status) => {
  return await api.patch(`/order-items/${itemId}/status`, { status });
};
