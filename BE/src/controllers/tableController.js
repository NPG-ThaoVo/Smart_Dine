import { successResponse, errorResponse } from "../utils/response.js";
import * as tableService from "../services/tableService.js";

export const create = async (req, res) => {
  try {
    const table = await tableService.createTable(req.body);
    return successResponse(res, "Tạo bàn thành công", table, 201);
  } catch (err) {
    return errorResponse(res, "Lỗi tạo bàn", 500, err.message);
  }
};

export const getAll = async (req, res) => {
  try {
    const tables = await tableService.getAllTables(req.query);
    const result = tables.map((table) => ({
      ...table.toObject(),
      status: table.currentSessionId ? "OCCUPIED" : "EMPTY",
    }));
    return successResponse(res, "Lấy danh sách bàn thành công", result);
  } catch (err) {
    return errorResponse(res, "Lỗi hệ thống", 500, err.message);
  }
};

export const getDetail = async (req, res) => {
  try {
    const table = await tableService.getTableById(req.params.id);
    if (!table)
      return errorResponse(res, "Không tìm thấy bàn", 404, "TABLE_NOT_FOUND");
    return successResponse(res, "Lấy chi tiết bàn thành công", {
      ...table.toObject(),
      status: table.currentSessionId ? "OCCUPIED" : "EMPTY",
      qrUrl: `https://smartdine.com/table/${table._id}`,
    });
  } catch (err) {
    return errorResponse(res, "Lỗi hệ thống", 500, err.message);
  }
};

export const update = async (req, res) => {
  try {
    const updatedTable = await tableService.updateTable(
      req.params.id,
      req.body
    );
    if (!updatedTable)
      return errorResponse(res, "Không tìm thấy bàn", 404, "TABLE_NOT_FOUND");
    return successResponse(res, "Cập nhật bàn thành công", {
      ...updatedTable.toObject(),
      status: updatedTable.currentSessionId ? "OCCUPIED" : "EMPTY",
    });
  } catch (err) {
    return errorResponse(res, "Lỗi cập nhật bàn", 500, err.message);
  }
};

export const remove = async (req, res) => {
  try {
    const deletedTable = await tableService.deleteTable(req.params.id);
    if (!deletedTable)
      return errorResponse(res, "Không tìm thấy bàn", 404, "TABLE_NOT_FOUND");
    return successResponse(res, "Xóa bàn thành công");
  } catch (err) {
    return errorResponse(res, "Lỗi xóa bàn", 500, err.message);
  }
};