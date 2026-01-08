import * as menuService from "../services/menuService.js";
import {successResponse,errorResponse} from "../utils/response.js";
//lấy tất cả menu items
export const getAllMenuItems = async (req, res) => {
  try {
    const menuItems = await menuService.getAllMenuItems();
     if(!menuItems){
      errorResponse(res,"Menu items not found",404);
    }
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
      errorResponse(res,"Menu item not found",404);
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
    const menuItem = await menuService.updateMenuItemById(menuItemId, menuItemData);
     if(!menuItem){
      errorResponse(res,"Menu item not found",404);
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
    const menuItem = await menuService.deleteMenuItemById(menuItemId);
    if(!menuItem){
      errorResponse(res,"Menu item not found",404);
    }
     return successResponse(res,"Menu item deleted successfully",menuItem);
  } catch (error) {
    return errorResponse(res,error.message,400);
  }
};
//tạo menu item
export const createMenuItem = async (req, res) => {
  try {
    const menuItemData = req.body;
    const menuItem = await menuService.createMenuItem(menuItemData);
     if(!menuItem){
      errorResponse(res,"Menu item not created",404);
    }
     return successResponse(res,menuItem);
  } catch (error) {
    return errorResponse(res,error.message,400);
  }
};