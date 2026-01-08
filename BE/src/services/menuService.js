import MenuItem from "../models/menu_itemsModel.js";

// tạo menu item
export const createMenuItem = async (menuItemData) => {
  return MenuItem.create(menuItemData);
};

// lấy tất cả menu items
export const getAllMenuItems = async () => {
  return MenuItem.find();
};

// lấy menu item theo id
export const getMenuItemById = async (menuItemId) => {
  return MenuItem.findById(menuItemId);
};

// cập nhật menu item theo id
export const updateMenuItemById = async (menuItemId, menuItemData) => {
  return MenuItem.findByIdAndUpdate(
    menuItemId,
    menuItemData,
    { new: true,
       runValidators: true
     }
  );
};

// xóa menu item theo id
export const deleteMenuItemById = async (menuItemId) => {
  return MenuItem.findByIdAndDelete(menuItemId);
};
