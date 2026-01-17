import api from "./index";

// Tạo thông báo mới
export const createNotification = async (notificationData) => {
  return await api.post("/notifications", notificationData);
};

// Lấy tất cả thông báo
export const getAllNotifications = async () => {
  return await api.get("/notifications");
};

// Đánh dấu thông báo đã đọc
export const markNotificationAsRead = async (notificationId) => {
  return await api.patch(`/notifications/${notificationId}/read`);
};
