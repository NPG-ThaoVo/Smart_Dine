import { successResponse, errorResponse } from "../utils/response.js";
import * as orderService from "../services/ordersService.js";

export const create = async (req, res) => {
  try {
    const order = await orderService.createOrder(req.body);
    return successResponse(res, "Tạo Đơn Hàng Thành Công", order, 201);
  } catch (err) {
    return errorResponse(res, "Lỗi Tạo Đơn Hàng", 500, err.message);
  }
};

export const getAll = async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();
    return successResponse(res, "Lấy Danh Sách Đơn Hàng Thành Công", orders);
  } catch (err) {
    return errorResponse(res, "Lỗi Hệ Thống", 500, err.message);
  }
};

export const getDetail = async (req, res) => {
  try {
    const order = await orderService.getOrderById(req.params.id);
    if (!order)
      return errorResponse(
        res,
        "Không tìm thấy đơn hàng",
        404,
        "ORDER_NOT_FOUND"
      );

    return successResponse(res, "Lấy Chi Tiết Đơn Hàng Thành Công", order);
  } catch (err) {
    return errorResponse(res, "Lỗi Hệ Thống", 500, err.message);
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["PENDING", "COMPLETED","CONFIRMED","CANCELLED"].includes(status)) {
      return errorResponse(
        res,
        "Trạng Thái Đơn Hàng Không Hợp Lệ",
        400,
        "INVALID_STATUS"
      );
    }

    const order = await orderService.updateOrderStatus(
      req.params.id,
      status
    );

    if (!order)
      return errorResponse(
        res,
        "Không tìm thấy đơn hàng",
        404,
        "ORDER_NOT_FOUND"
      );

    return successResponse(res, "Cập Nhật Trạng Thái Đơn Hàng Thành Công", order);
  } catch (err) {
    return errorResponse(res, "Lỗi Cập Nhật Đơn Hàng", 500, err.message);
  }
};

export const getByTable = async (req, res) => {
  try {
    const orders = await orderService.getOrdersByTableId(req.params.tableId);
    return successResponse(res, "Lấy Danh Sách Đơn Hàng Theo Bàn Thành Công", orders);
  } catch (err) {
    return errorResponse(res, "Lỗi Hệ Thống", 500, err.message);
  }
};
