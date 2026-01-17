import * as notificationService from '../services/notificationServices.js';
import { successResponse, errorResponse } from '../utils/response.js';

// Tạo thông báo mới
export const createNotification = async (req, res) => {
  try {
    const notification = await notificationService.createNotification(req.body);
    return successResponse(res, notification, 'Tạo thông báo thành công', 201);
  } catch (error) {
    console.error('Lỗi khi tạo thông báo:', error);
    return errorResponse(res, error.message, 500);
  }
};

//  Lấy danh sách thông báo
export const getAllNotifications = async (req, res) => {
  try {
    const notifications = await notificationService.getAllNotifications();
    return successResponse(res, notifications, 'Lấy danh sách thông báo thành công');
  } catch (error) {
    console.error('Lỗi khi lấy danh sách thông báo:', error);
    return errorResponse(res, error.message, 500);
  }
};
//Đánh dấu đã đọc
export const markAsRead = async (req, res) => {
  try {
    const notification = await notificationService.markNotificationAsRead(req.params.id);
    if (!notification) {
      return errorResponse(res, 'Không tìm thấy thông báo', 404);
    }
    return successResponse(res, notification, 'Đánh dấu đã đọc thành công');
  } catch (error) {
    console.error('Lỗi khi đánh dấu đã đọc:', error);
    return errorResponse(res, error.message, 500);
  }
};
