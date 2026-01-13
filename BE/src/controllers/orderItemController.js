import { successResponse, errorResponse } from "../utils/response.js";
import * as orderItemService from "../services/orderItemService.js";

export const getByOrder = async (req, res) => {
  try {
    const result = await orderItemService.getOrderItemsByOrderId(
      req.params.orderId
    );

    return successResponse(
      res,
      "Lấy Danh Sách Món Theo Đơn Hàng Thành Công",
      result
    );
  } catch (err) {
    return errorResponse(res, "Lỗi Hệ Thống", 500, err.message);
  }
};

export const getByTable = async (req, res) => {
  try {
    const result = await orderItemService.getOrderItemsByTableId(
      req.params.tableId
    );

    return successResponse(
      res,
      "Lấy Danh Sách Món Theo Bàn Thành Công",
      result
    );
  } catch (err) {
    return errorResponse(res, "Lỗi Hệ Thống", 500, err.message);
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["PREPARING", "SERVED"].includes(status)) {
      return errorResponse(
        res,
        "Trạng Thái Món Không Hợp Lệ",
        400,
        "INVALID_STATUS"
      );
    }

    const result = await orderItemService.updateOrderItemStatus(
      req.params.id,
      status
    );

    if (!result)
      return errorResponse(
        res,
        "Không Tìm Thấy Món",
        404,
        "ORDER_ITEM_NOT_FOUND"
      );

    return successResponse(res, "Cập Nhật Trạng Thái Món Thành Công", result);
  } catch (err) {
    return errorResponse(res, "Lỗi Cập Nhật Trạng Thái Món", 500, err.message);
  }
};

//controller add order items
export const addOrderItems = async (req, res) => {
  try {
    const { tableId, orderItems } = req.body;

    // Validate payload
    if (!tableId) {
      return errorResponse(res, "tableId là bắt buộc", 400, "MISSING_TABLE_ID");
    }

    if (!orderItems || !Array.isArray(orderItems) || orderItems.length === 0) {
      return errorResponse(res, "orderItems phải là mảng và không được rỗng", 400, "INVALID_ORDER_ITEMS");
    }

    const result = await orderItemService.addOrderItems(req.body);
    return successResponse(res, "Thêm Món Vào Đơn Hàng Thành Công", result);
  } catch (err) {
    console.log("🚀 ~ addOrderItems ~ err:", err)
    return errorResponse(res, "Lỗi Thêm Món Vào Đơn Hàng", 500, err.message);
  }
};