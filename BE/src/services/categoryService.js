import Category from "../models/categoriesModel.js";

//tạo danh mục món ăn
export const createCategory = async (categoryData) => {
  const category = await Category.create(categoryData);
  return Category.findById(category._id);
};
//lấy danh sách danh mục món ăn
export const getAllCategories = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  const [categories, total] = await Promise.all([
    Category.find().skip(skip).limit(limit),
    Category.countDocuments(),
  ]);
  return {
    categories,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};
//câp nhật danh mục món ăn theo id
export const updateCategoryById = async (categoryId, categoryData) => {
  return Category.findByIdAndUpdate(categoryId, categoryData, {
    new: true,
    runValidators: true,
  });
};

//xóa danh mục món ăn theo id
export const deleteCategoryById = async (categoryId) => {
  return Category.findByIdAndDelete(categoryId);
};
