import OrderManagement from '../../components/OrderManagement';
import React from 'react'
import { getAllOrders, getOrderById, updateOrderStatus } from '../../services/api/order';
import { useEffect, useState } from 'react';
import toast from "react-hot-toast";
const OrderManagementPage = () => {
const [getAllOrder, setAllOrder] = useState([]);
const [loading, setLoading] = useState(false);
const fetchAllOrders = async () => {
   try {
      setLoading(true);
      const res = await getAllOrders();
      setAllOrder(res.data.data || []);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Không thể tải danh sách đơn hàng"
      );
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAllOrders();
  }, []);
const [orderDetail, setOrderDetail] = useState(null);
  // Lấy chi tiết đơn hàng theo ID
  const getOrderDetail = async (id) => {
    try {
      setLoading(true);
      const res = await getOrderById(id);
      setOrderDetail(res.data.data || null);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Không thể tải chi tiết đơn hàng"
      );
    } finally {
      setLoading(false);
    }
  };
  // Cập nhật trạng thái đơn hàng
  const updateOrderStatusHandler = async (id, status) => {
    try {
      setLoading(true);
      const res = await updateOrderStatus(id, status);
      toast.success(res.data.message || "Cập Nhật Trạng Thái Đơn Hàng Thành Công");
      fetchAllOrders();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Cập Nhật Trạng Thái Đơn Hàng Thất Bại"
      );
    } finally {
      setLoading(false);
    }
  };
  //
  return (
    <OrderManagement orders={getAllOrder} getOrderDetail={getOrderDetail} updateOrderStatus={updateOrderStatusHandler} />
  )
}


export default OrderManagementPage;
