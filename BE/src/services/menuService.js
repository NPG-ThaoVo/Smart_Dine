import MenuItem from '../models/menu_itemsModel.js';
//tạo menu item 
export const createMenuItem = async (menuItemData) => {
  try {
    const menuItem = new MenuItem(menuItemData);
    await menuItem.save();
    return menuItem;
  } catch (error) {
    throw error;
  }
};
//lấy tất cả menu items
export const getAllMenuItems = async () => {
  try {
    const menuItems = await MenuItem.find().exec();
    if (!menuItems) {
      throw new Error("Menu items not found");
    }
    return menuItems;
  } catch (error) {
    throw error;
  }
};
//lấy menu item theo id
export const getMenuItemById = async (menuItemId) => {
  try {
    const menuItem = await MenuItem.findById(menuItemId).exec();
    if (!menuItem) {
      throw new Error("Menu item not found");
    }
    return menuItem;
  } catch (error) {
    throw error;
  }
};
//cập nhật menu item theo id
export const updateMenuItemById = async (menuItemId, menuItemData) => {
  try {
    const menuItem = await MenuItem.findByIdAndUpdate(menuItemId, menuItemData, { new: true }).exec();
    if (!menuItem) {
      throw new Error("Menu item not found");
    }
    return menuItem;
  } catch (error) {
    throw error;
  }
};
//xóa menu item theo id
export const deleteMenuItemById = async (menuItemId) => {
  try {
    const menuItem = await MenuItem.findByIdAndDelete(menuItemId).exec();
    if (!menuItem) {
      throw new Error("Menu item not found");
    }
    return menuItem;
  } catch (error) {
    throw error;
  }
};
