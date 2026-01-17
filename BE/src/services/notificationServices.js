import notificationModel from '../models/notificationsModel.js';

// Tạo thông báo mới
export const createNotification = async (payload) => {
  return await notificationModel.create(payload);
};

// Lấy tất cả thông báo (sắp xếp theo mới nhất)
export const getAllNotifications = async () => {
  return await notificationModel.find()
    .populate('tableId', 'number')
    .populate('orderId', 'status orderItems note')
    .sort({ createdAt: -1 });
};

// Đánh dấu thông báo đã đọc
export const markNotificationAsRead = async (id) => {
  return await notificationModel.findByIdAndUpdate(
    id, 
    { status: 'READ' }, 
    { new: true }
  );
};
