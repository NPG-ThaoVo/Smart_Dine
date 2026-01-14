import api from "./index";

/**
 * Thêm order items vào bàn (pending, chưa có orderId)
 * @param {Object} data - { tableId, orderItems: [{menuItemId, quantity, price}] }
 * @returns {Promise} Created order items
 */
export const addOrderItems = async (data) => {
  return await api.post("/order-items", data);
};

/**
 * Lấy order items theo orderId
 * @param {string} orderId - ID của order
 * @returns {Promise} List of order items
 */
export const getOrderItemsByOrder = async (orderId) => {
  return await api.get(`/order-items/order/${orderId}`);
};

/**
 * Lấy order items theo tableId
 * @param {string} tableId - ID của bàn
 * @returns {Promise} List of order items
 */
export const getOrderItemsByTable = async (tableId) => {
  return await api.get(`/order-items/table/${tableId}`);
};

/**
 * Cập nhật status của order item
 * @param {string} itemId - ID của order item
 * @param {string} status - PREPARING | SERVED
 * @returns {Promise} Updated order item
 */
export const updateOrderItemStatus = async (itemId, status) => {
  return await api.patch(`/order-items/${itemId}/status`, { status });
};
