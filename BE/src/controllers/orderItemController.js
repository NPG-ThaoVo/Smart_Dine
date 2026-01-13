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
