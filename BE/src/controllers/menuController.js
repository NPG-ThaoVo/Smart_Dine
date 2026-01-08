import * as menuService from "../services/menuService.js";
import {successResponse,errorResponse} from "../utils/response.js";
//lấy tất cả menu items
export const getAllMenuItems = async (req, res) => {
  try {
    const menuItems = await menuService.getAllMenuItems();
     return successResponse(res,menuItems);
  } catch (error) {
    return errorResponse(res,error.message,400);
  }
};
//lấy menu item theo id
export const getMenuItemById = async (req, res) => {
  try {
    const menuItemId = req.params.menuItemId;
    const menuItem = await menuService.getMenuItemById(menuItemId);
     if(!menuItem){
       return errorResponse(res,"Menu item not found",404);
    }
     return successResponse(res,menuItem);
  } catch (error) {
    return errorResponse(res,error.message,400);
  }
};
//cập nhật menu item theo id
export const updateMenuItemById = async (req, res) => {
  try {
    const menuItemId = req.params.menuItemId;
    const menuItemData = req.body;
    if (!menuItemId) {
      return errorResponse(res, "Menu item ID is required", 400);
    }
    if (!menuItemData || Object.keys(menuItemData).length === 0) {
      return errorResponse(res, "Update data is required", 400);
    }
    const menuItem = await menuService.updateMenuItemById(menuItemId, menuItemData);
     if(!menuItem){
      return errorResponse(res,"Menu item not found",404);
    }

     return successResponse(res,menuItem);
  } catch (error) {
    return errorResponse(res,error.message,400);
  }
};
//xóa menu item theo id
export const deleteMenuItemById = async (req, res) => {
  try {
    const menuItemId = req.params.menuItemId;
       if (!menuItemId) {
      return errorResponse(res, "Menu item ID is required", 400);
    }
    const menuItem = await menuService.deleteMenuItemById(menuItemId);
    if(!menuItem){
      return errorResponse(res,"Menu item not found",404);
    }
 return successResponse(res, { message: "Menu item deleted successfully", data: menuItem });
  } catch (error) {
    return errorResponse(res,error.message,400);
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
    return errorResponse(res,error.message,400);
  }
};