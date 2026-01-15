import api from "./index";

// Tạo đơn hàng mới
export const createOrder = async (data) => {
  return await api.post("/orders", data);
};

// Lấy tất cả đơn hàng
export const getAllOrders = async () => {
  return await api.get("/orders");
};

// Lấy chi tiết đơn hàng theo ID
export const getOrderById = async (id) => {
  return await api.get(`/orders/${id}`);
};

// Cập nhật trạng thái đơn hàng
export const updateOrderStatus = async (id, status) => {
  return await api.patch(`/orders/${id}/status`, { status });
};

// Lấy danh sách đơn hàng theo bàn
export const getOrdersByTable = async (tableId) => {
  return await api.get(`/orders/table/${tableId}`);
};
