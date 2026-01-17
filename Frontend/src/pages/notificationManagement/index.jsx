import React, { useState, useEffect } from 'react'
import NotificationManagement from '../../components/notificationManagement'
import { getAllNotifications, markNotificationAsRead } from '../../services/api/notification'
import { toast } from 'react-hot-toast'
import { io } from 'socket.io-client'

const NotificationManagementPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  // 1. Lấy danh sách thông báo
  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const res = await getAllNotifications();
      setNotifications(res.data.data || []);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      toast.error("Không thể tải thông báo");
    } finally {
      setLoading(false);
    }
  };

  // 2. Đánh dấu một thông báo đã đọc
  const handleMarkAsRead = async (notificationId) => {
    try {
      await markNotificationAsRead(notificationId);
      
      // Cập nhật state local
      setNotifications(prev => 
        prev.map(notif => 
          notif._id === notificationId 
            ? { ...notif, status: 'READ' } 
            : notif
        )
      );
      
      toast.success("Đã đánh dấu đã đọc");
    } catch (error) {
      console.error("Error marking notification as read:", error);
      toast.error("Không thể đánh dấu đã đọc");
    }
  };

  // 3. Đánh dấu tất cả đã đọc
  const handleMarkAllAsRead = async () => {
    try {
      const unreadNotifications = notifications.filter(n => n.status === 'UNREAD');
      
      // Gọi API cho tất cả thông báo chưa đọc
      await Promise.all(
        unreadNotifications.map(notif => markNotificationAsRead(notif._id))
      );
      
      // Cập nhật state local
      setNotifications(prev => 
        prev.map(notif => ({ ...notif, status: 'READ' }))
      );
      
      toast.success("Đã đánh dấu tất cả đã đọc");
    } catch (error) {
      console.error("Error marking all as read:", error);
      toast.error("Không thể đánh dấu tất cả đã đọc");
    }
  };

  useEffect(() => {
    fetchNotifications();

    // Kết nối Socket.IO để nhận thông báo realtime
    const socket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:3001');

    socket.on('connect', () => {
      console.log('✅ Đã kết nối Socket.IO:', socket.id);
    });

    socket.on('NEW_ORDER','FOOD_READY', (notification) => {
      
      console.log('📢 Nhận thông báo mới:', notification);
      
      // Thêm thông báo mới vào đầu danh sách
      setNotifications(prev => [notification, ...prev]);
      
      // Hiển thị toast thông báo
      if (notification.type === 'NEW_ORDER') {
        toast(`🛎️ ${notification.title}`, {
          duration: 5000,
          icon: '🔔',
        });
      } else if (notification.type === 'FOOD_READY') {
        toast.success(`🍽️ ${notification.title}`, {
          duration: 5000,
        });
      }
    });

    socket.on('disconnect', () => {
      console.log('❌ Mất kết nối Socket.IO');
    });

    socket.on('connect_error', (error) => {
      console.error('❌ Lỗi kết nối Socket.IO:', error);
    });

    // Cleanup khi component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <NotificationManagement 
        notifications={notifications}
        loading={loading}
        onMarkAsRead={handleMarkAsRead}
        onMarkAllAsRead={handleMarkAllAsRead}
      />
    </div>
  )
}

export default NotificationManagementPage