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
    return errorResponse(res, "Invalid pagination parameters", 400);
  }
  const safePage = page || 1;
  const safeLimit = Math.min(limit || 10, 100);
// Prevent DOS via excessive skip values
  const MAX_PAGE = 10000;
  if (safePage > MAX_PAGE) {
    return errorResponse(res, `Page number cannot exceed ${MAX_PAGE}`, 400);
  }
  try {
    const result = await menuService.getAllMenuItems(
      safePage,
      safeLimit
    );

    return successResponse(res, result);
  } catch (error) {
    console.error("Error fetching menu items:", error);
    return errorResponse(res, "Internal server error", 500);
  }
};

//lấy menu item theo id
export const getMenuItemById = async (req, res) => {
  try {
    const menuItemId = req.params.menuItemId;
    if (!mongoose.Types.ObjectId.isValid(menuItemId)) {
       return errorResponse(res, "Invalid menu item ID format", 400);
     }
     const menuItem = await menuService.getMenuItemById(menuItemId);
    if (!menuItem) {
      return errorResponse(res, "Menu item not found", 404);
    }
     return successResponse(res,menuItem);
  } catch (error) {
    console.error("Error fetching menu item:", error);
    return errorResponse(res, "Internal server error", 500);
  }
};
//cập nhật menu item theo id
export const updateMenuItemById = async (req, res) => {
  try {
    const menuItemId = req.params.menuItemId;
    const menuItemData = req.body;
    if (!mongoose.Types.ObjectId.isValid(menuItemId)) {
      return errorResponse(res, "Invalid menu item ID format", 400);
    }
    if (!menuItemData || Object.keys(menuItemData).length === 0) {
      return errorResponse(res, "Update data is required", 400);
    }
    const menuItem = await menuService.updateMenuItemById(menuItemId, menuItemData);
     if(!menuItem){
      return errorResponse(res,"Menu item not found",404);
    }
     // Validate price if it's being updated
     if (menuItemData.price !== undefined && menuItemData.price <= 0) {
      return errorResponse(res, "Price must be greater than 0", 400);
    }

     return successResponse(res, { message: "Menu item updated successfully", data: menuItem });
  } catch (error) {
    console.error("Error in updateMenuItemById:", error);
   if (error.name === 'ValidationError') {
     return errorResponse(res, error.message, 400);
   }
    return errorResponse(res, "Internal server error", 500);
  }
};
//xóa menu item theo id
export const deleteMenuItemById = async (req, res) => {
  try {
    const menuItemId = req.params.menuItemId;
   
    if (!mongoose.Types.ObjectId.isValid(menuItemId)) {
      return errorResponse(res, "Invalid menu item ID format", 400);
    }
    const menuItem = await menuService.deleteMenuItemById(menuItemId);
    if(!menuItem){
      return errorResponse(res,"Menu item not found",404);
    }
 return successResponse(res, { message: "Menu item deleted successfully", data: menuItem });
  } catch (error) {
    console.error("Error deleting menu item:", error);
    return errorResponse(res, "Internal server error", 500);
  }
};
//tạo menu item
export const createMenuItem = async (req, res) => {
  try {
    const menuItemData = req.body;
       if (!menuItemData || Object.keys(menuItemData).length === 0) {
      return errorResponse(res, "Menu item data is required", 400);
    }
    // Add specific field validation
    if (!menuItemData.name || !menuItemData.price) {
      return errorResponse(res, "Name and price are required fields", 400);
    }
    // Add more specific field validations if needed
    if (menuItemData.price <= 0) {
      return errorResponse(res, "Price must be greater than 0", 400);
    }
    const menuItem = await menuService.createMenuItem(menuItemData);
     return successResponse(res,menuItem);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return errorResponse(res, error.message, 400);
    }
     console.error("Error creating menu item:", error);
    return errorResponse(res, "Internal server error", 500);
  }
};