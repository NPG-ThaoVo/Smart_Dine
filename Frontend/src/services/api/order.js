import api from "./index";

/**
 * Tạo order mới từ giỏ hàng
 * @param {Object} orderData - { userId, tableId, note, items: [{menuItemId, quantity, price, note}] }
 * @returns {Promise} Order response
 */
export const createOrder = async (orderData) => {
  return await api.post("/orders", orderData);
};

/**
 * Lấy chi tiết order theo ID
 * @param {string} orderId - ID của order
 * @returns {Promise} Order detail
 */
export const getOrderById = async (orderId) => {
  return await api.get(`/orders/${orderId}`);
};

/**
 * Lấy tất cả orders
 * @returns {Promise} List of orders
 */
export const getAllOrders = async () => {
  return await api.get("/orders");
};

/**
 * Cập nhật trạng thái order
 * @param {string} orderId - ID của order
 * @param {string} status - PENDING | CONFIRMED | COMPLETED | CANCELLED
 * @returns {Promise} Updated order
 */
export const updateOrderStatus = async (orderId, status) => {
  return await api.patch(`/orders/${orderId}/status`, { status });
};

/**
 * Lấy orders theo table
 * @param {string} tableId - ID của bàn
 * @returns {Promise} List of orders
 */
export const getOrdersByTable = async (tableId) => {
  return await api.get(`/orders/table/${tableId}`);
};
