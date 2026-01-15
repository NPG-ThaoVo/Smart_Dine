import * as billService from "../services/billService.js";
import { successResponse, errorResponse } from "../utils/response.js";
import mongoose from "mongoose";

// Tạo hóa đơn từ bàn
export const createBill = async (req, res) => {
  try {
    const { tableId, totalAmount } = req.body;

    if (!tableId || totalAmount === undefined) {
      return errorResponse(
        res,
        "Table ID và tổng tiền là các trường bắt buộc",
        400
      );
    }

    if (!mongoose.Types.ObjectId.isValid(tableId)) {
      return errorResponse(res, "Định dạng Table ID không hợp lệ", 400);
    }

    if (!Number.isFinite(totalAmount) || totalAmount < 0) {
      return errorResponse(res, "Tổng tiền phải là số không âm", 400);
    }

    const billData = { tableId, totalAmount, status: req.body.status };
    const bill = await billService.createBill(billData);

    return successResponse(res, "Tạo hóa đơn thành công", bill);
  } catch (error) {
    if (error.name === "ValidationError") {
      return errorResponse(res, error.message, 400);
    }
    console.error("Lỗi tạo hóa đơn:", error);
    return errorResponse(res, "Lỗi máy chủ nội bộ", 500);
  }
};

// Lấy danh sách hóa đơn
export const getAllBills = async (req, res) => {
  const page = Number(req.query.page);
  const limit = Number(req.query.limit);
  const status = req.query.status; // UNPAID hoặc PAID

  // Validate query params
  if (
    (req.query.page && (!Number.isInteger(page) || page < 1)) ||
    (req.query.limit && (!Number.isInteger(limit) || limit < 1))
  ) {
    return errorResponse(res, "Tham số phân trang không hợp lệ", 400);
  }

  if (status && !["UNPAID", "PAID"].includes(status)) {
    return errorResponse(
      res,
      "Trạng thái không hợp lệ. Chỉ chấp nhận UNPAID hoặc PAID",
      400
    );
  }

  const safePage = page || 1;
  const safeLimit = Math.min(limit || 10, 100);

  // Prevent DOS via excessive skip values
  const MAX_PAGE = 10000;
  if (safePage > MAX_PAGE) {
    return errorResponse(res, `Số trang không được vượt quá ${MAX_PAGE}`, 400);
  }

  try {
    const result = await billService.getAllBills(safePage, safeLimit, status);
    return successResponse(res, "Lấy danh sách hóa đơn thành công", result);
  } catch (error) {
    console.error("Lỗi lấy danh sách hóa đơn:", error);
    return errorResponse(res, "Lỗi máy chủ nội bộ", 500);
  }
};

// Lấy chi tiết hóa đơn theo id
export const getBillById = async (req, res) => {
  try {
    const billId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(billId)) {
      return errorResponse(res, "Định dạng ID hóa đơn không hợp lệ", 400);
    }

    const bill = await billService.getBillById(billId);

    if (!bill) {
      return errorResponse(res, "Không tìm thấy hóa đơn", 404);
    }

    return successResponse(res, "Lấy chi tiết hóa đơn thành công", bill);
  } catch (error) {
    console.error("Lỗi lấy chi tiết hóa đơn:", error);
    return errorResponse(res, "Lỗi máy chủ nội bộ", 500);
  }
};

// Lấy thống kê doanh thu
export const getBillStats = async (req, res) => {
  try {
    const stats = await billService.getBillStats();
    return successResponse(res, "Lấy thống kê doanh thu thành công", stats);
  } catch (error) {
    console.error("Lỗi lấy thống kê doanh thu:", error);
    return errorResponse(res, "Lỗi máy chủ nội bộ", 500);
  }
};

export const payBill = async (req, res) => {
  try {
    const { id } = req.params;

    const bill = await billModel.findById(id);
    if (!bill) {
      return res.status(404).json({ message: "Khong tim thay hoa don" });
    }

    if (bill.status === "paid") {
      return res.status(400).json({ message: "Hoa don da duoc thanh toan" });
    }

    bill.status = "paid";
    bill.paidAt = new Date();

    await bill.save();

    res.json({
      message: "Thanh toan thanh cong",
      data: bill,
    });
  } catch (error) {
    console.error("payBill error:", error);
    res.status(500).json({ message: "Loi server" });
  }
};
