import * as menuService from "../services/menuService.js";
import {successResponse,errorResponse} from "../utils/response.js";
import mongoose from "mongoose";
//lấy tất cả menu items
export const getAllMenuItems = async (req, res) => {
  const page = Number(req.query.page);
  const limit = Number(req.query.limit);

  // Validate query params
  if (
    (req.query.page && (!Number.isInteger(page) || page < 1)) ||
    (req.query.limit && (!Number.isInteger(limit) || limit < 1))
  ) {
    return errorResponse(res, "Tham số phân trang không hợp lệ", 400);
  }
  const safePage = page || 1;
  const safeLimit = Math.min(limit || 10, 100);
// Prevent DOS via excessive skip values
  const MAX_PAGE = 10000;
  if (safePage > MAX_PAGE) {
    return errorResponse(res, `Số trang không được vượt quá ${MAX_PAGE}`, 400);
  }
  try {
    const result = await menuService.getAllMenuItems(
      safePage,
      safeLimit
    );

    return successResponse(res, result);
  } catch (error) {
    console.error("Error fetching menu items:", error);
    return errorResponse(res, "Lỗi máy chủ nội bộ", 500);
  }
};

//lấy menu item theo id
export const getMenuItemById = async (req, res) => {
  try {
    const menuItemId = req.params.menuItemId;
    if (!mongoose.Types.ObjectId.isValid(menuItemId)) {
       return errorResponse(res, "Định dạng ID món không hợp lệ", 400);
     }
     const menuItem = await menuService.getMenuItemById(menuItemId);
    if (!menuItem) {
      return errorResponse(res, "Không tìm thấy món", 404);
    }
     return successResponse(res,menuItem);
  } catch (error) {
    console.error("Error fetching menu item:", error);
    return errorResponse(res, "Lỗi máy chủ nội bộ", 500);
  }
};
//cập nhật menu item theo id
export const updateMenuItemById = async (req, res) => {
  try {
    const menuItemId = req.params.menuItemId;
    const menuItemData = req.body;
    if (!mongoose.Types.ObjectId.isValid(menuItemId)) {
      return errorResponse(res, "Định dạng ID món không hợp lệ", 400);
    }
    if (!menuItemData || Object.keys(menuItemData).length === 0) {
      return errorResponse(res, "Yêu cầu cung cấp dữ liệu cập nhật", 400);
    }
        // Validate price if it's being updated
     if (menuItemData.price !== undefined && menuItemData.price <= 0) {
      return errorResponse(res, "Giá phải lớn hơn 0", 400);
    }
    
    const menuItem = await menuService.updateMenuItemById(menuItemId, menuItemData);
     if(!menuItem){
      return errorResponse(res,"Không tìm thấy món",404);
    }
     return successResponse(res, { message: "Cập nhật món thành công", data: menuItem });
  } catch (error) {
    console.error("Error in updateMenuItemById:", error);
   if (error.name === 'ValidationError') {
     return errorResponse(res, error.message, 400);
   }
    return errorResponse(res, "Lỗi máy chủ nội bộ", 500);
  }
};
//xóa menu item theo id
export const deleteMenuItemById = async (req, res) => {
  try {
    const menuItemId = req.params.menuItemId;
   
    if (!mongoose.Types.ObjectId.isValid(menuItemId)) {
      return errorResponse(res, "Định dạng ID món không hợp lệ", 400);
    }
    const menuItem = await menuService.deleteMenuItemById(menuItemId);
    if(!menuItem){
      return errorResponse(res,"Không tìm thấy món",404);
    }
 return successResponse(res, { message: "Xóa món thành công", data: menuItem });
  } catch (error) {
    console.error("Error deleting menu item:", error);
    return errorResponse(res, "Lỗi máy chủ nội bộ", 500);
  }
};
//tạo menu item
export const createMenuItem = async (req, res) => {
  try {
    const { name, price, description, image, categoryId } = req.body;
    if (!name || price === undefined) {
      return errorResponse(res, "Tên và giá là các trường bắt buộc", 400);
    }
    if (price <= 0) {
      return errorResponse(res, "Giá phải lớn hơn 0", 400);
    }
    //giá phải là số
    if (!Number.isFinite(price)) {
      return errorResponse(res, "Giá phải là số hợp lệ", 400);
    }
    if (categoryId && !mongoose.Types.ObjectId.isValid(categoryId)) {
      return errorResponse(res, "Định dạng ID danh mục không hợp lệ", 400);
    }
    const menuItemData = { name, price, description, image, categoryId };
    const menuItem = await menuService.createMenuItem(menuItemData);
     return successResponse(res,menuItem);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return errorResponse(res, error.message, 400);
    }
     console.error("Error creating menu item:", error);
    return errorResponse(res, "Lỗi máy chủ nội bộ", 500);
  }
};