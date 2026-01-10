import MenuItem from "../models/menu_itemsModel.js";

// tạo menu item
export const createMenuItem = async (menuItemData) => {
  const menuItem = await MenuItem.create(menuItemData);
  return MenuItem.findById(menuItem._id).populate('categoryId', 'name');
};

export const getAllMenuItems = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const [items, total] = await Promise.all([
    MenuItem.find().populate('categoryId', 'name').skip(skip).limit(limit),
    MenuItem.countDocuments()
  ]);

  return {
    items,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    }
  };
};


// lấy menu item theo id
export const getMenuItemById = async (menuItemId) => {
  return MenuItem.findById(menuItemId).populate('categoryId', 'name');
};

// cập nhật menu item theo id
export const updateMenuItemById = async (menuItemId, menuItemData) => {
  return MenuItem.findByIdAndUpdate(
    menuItemId,
    menuItemData,
    { new: true,
       runValidators: true
     }
  ).populate('categoryId', 'name');
};

// xóa menu item theo id
export const deleteMenuItemById = async (menuItemId) => {
  return MenuItem.findByIdAndDelete(menuItemId);
};
