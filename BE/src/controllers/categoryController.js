import { successResponse, errorResponse } from "../utils/response.js";
import * as categoryService from "../services/categoryService.js";

export const create = async (req, res) => {
  try {
    const category = await categoryService.createCategory(req.body);
    return successResponse(res, "Tạo danh mục món ăn thành công", category, 201);
  } catch (err) {
    return errorResponse(res, "Lỗi tạo danh mục món ăn", 500, err.message);
  }
};

export const getAll = async (req, res) => {
  try {
    const categories = await categoryService.getAllCategories();
    return successResponse(res, "Lấy danh sách danh mục món ăn", categories);
  } catch (err) {
    return errorResponse(res, "Lỗi hệ thống", 500, err.message);
  }
};

export const getDetail = async (req, res) => {
  try {
    const category = await categoryService.getCategoryById(req.params.id);
    if (!category)
      return errorResponse(
        res,
        "Không tìm thấy danh mục",
        404,
        "CATEGORY_NOT_FOUND"
      );
    return successResponse(res, "Lấy chi tiết danh mục", category);
  } catch (err) {
    return errorResponse(res, "Lỗi hệ thống", 500, err.message);
  }
};

export const update = async (req, res) => {
  try {
    const updatedCategory = await categoryService.updateCategoryById(
      req.params.id,
      req.body
    );
    if (!updatedCategory)
      return errorResponse(
        res,
        "Không tìm thấy danh mục",
        404,
        "CATEGORY_NOT_FOUND"
      );
    return successResponse(
      res,
      "Cập nhật danh mục thành cong",
      updatedCategory
    );
  } catch (err) {
    return errorResponse(res, "Lỗi cập nhật danh mục", 500, err.message);
  }
};
export const remove = async (req, res) => {
  try {
    const deletedCategory = await categoryService.deleteCategoryById(
      req.params.id
    );
    if (!deletedCategory)
      return errorResponse(
        res,
        "Không tìm thấy danh mục",
        404,
        "CATEGORY_NOT_FOUND"
      );
    return successResponse(res, "Xóa danh mục thành công", deletedCategory);
  } catch (err) {
    return errorResponse(res, "Lỗi xóa danh mục", 500, err.message);
  }
};
