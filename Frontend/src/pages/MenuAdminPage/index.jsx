import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { GoogleGenerativeAI } from "@google/generative-ai";
import MenuFood from "@/components/MenuFood";
import DialogCreateMenu from "@/components/DialogCreateMenu";
import { DialogDeleteConfirm } from "@/components/DialogDeleteConfirm";
import {
  getMenuItems,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from "@/services/api/menu";
import { getAllCategories } from "@/services/api/category";

const INITIAL_FORM_DATA = {
  name: "",
  category: "",
  price: "",
  description: "",
  upsell: "",
  available: true,
  image: "",
};

const MenuAdminPage = () => {
  const [activeCategory, setActiveCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deletingItem, setDeletingItem] = useState(null);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState({ description: false, upsell: false });
  const [generatingItemId, setGeneratingItemId] = useState(null);

  const uploadImageToCloudinary = async (file) => {
    if (!file) return null;
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      { method: "POST", body: formData }
    );
    if (!res.ok) throw new Error("Upload failed");
    const result = await res.json();
    return result.secure_url;
  };

  const generateGeminiText = async (prompt) => {
    const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    return result.response.text().trim();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [menuRes, catRes] = await Promise.all([
        getMenuItems(),
        getAllCategories()
      ]);
      if (menuRes.data?.data?.items) {
        setMenuItems(menuRes.data.data.items);
      }
      let fetchedCategories = [];
      if (catRes.data?.data) {
        if (catRes.data.data.categories && Array.isArray(catRes.data.data.categories)) {
          fetchedCategories = catRes.data.data.categories;
        } else if (Array.isArray(catRes.data.data)) {
          fetchedCategories = catRes.data.data;
        }
        setCategories(fetchedCategories);
      }
      if (fetchedCategories.length > 0) {
        setActiveCategory(fetchedCategories[0].name);
      } else {
        setActiveCategory("");
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
      toast.error("Không thể tải dữ liệu");
    }
  };

  const fetchMenuItems = async () => {
    try {
      const res = await getMenuItems();
      if (res.data?.data?.items) {
        setMenuItems(res.data.data.items);
      }
    } catch (error) {
      console.error("Failed to fetch menu items:", error);
    }
  };

  const handleSaveItem = async () => {
    if (!formData.category) {
      toast.error("Vui lòng chọn danh mục!");
      return;
    }
    let imageUrl = "";
    try {
      if (file) {
        imageUrl = await uploadImageToCloudinary(file);
      } else if (editingId) {
        const existingItem = menuItems.find((i) => i._id === editingId);
        imageUrl = existingItem?.image;
      }
    } catch (error) {
      console.error("Cloudinary upload failed", error);
      toast.error(`Upload ảnh thất bại: ${error.message}`);
      return;
    }
    const selectedCategory = categories.find(c => c.name === formData.category);
    const payload = {
      name: formData.name,
      price: Number(formData.price),
      description: formData.description,
      image: imageUrl || "https://placehold.co/600x400?text=No+Image",
      categoryId: selectedCategory ? selectedCategory._id : null,
      isAvailable: formData.available,
      upsellSuggestions: formData.upsell ? [formData.upsell] : [],
    };
    try {
      if (editingId) {
        await updateExistingItem(editingId, payload);
      } else {
        await createNewItem(payload);
      }
      resetForm();
    } catch (error) {
      console.error("Failed to save menu item:", error);
      toast.error(error.response?.data?.message || "Có lỗi xảy ra!");
    }
  };

  const updateExistingItem = async (id, payload) => {
    const res = await updateMenuItem(id, payload);
    if (res.data?.data) {
      const updatedItem = res.data.data;
      setMenuItems((prev) =>
        prev.map((item) => (item._id === id ? updatedItem : item))
      );
      toast.success("Cập nhật món thành công!");
    }
  };

  const createNewItem = async (payload) => {
    const res = await createMenuItem(payload);
    const newItemBackend = res.data.data || res.data.message;
    if (newItemBackend) {
      setMenuItems((prev) => [...prev, newItemBackend]);
      toast.success("Thêm món thành công!");
    }
  };

  const handleDeleteClick = (item) => {
    setDeletingItem(item);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!deletingItem) return;
    try {
      await deleteMenuItem(deletingItem._id);
      setMenuItems((prev) => prev.filter((i) => i._id !== deletingItem._id));
      toast.success("Đã xóa món ăn");
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error("Failed to delete item:", error);
      toast.error(error.response?.data?.message || "Lỗi khi xóa món!");
    }
  };

  const resetForm = () => {
    setIsCreateDialogOpen(false);
    setFile(null);
    setEditingId(null);
    setFormData(INITIAL_FORM_DATA);
  };

  const handleAddClick = () => {
    setEditingId(null);
    setFile(null);
    setFormData(INITIAL_FORM_DATA);
    setIsCreateDialogOpen(true);
  };

  const handleEditClick = (item) => {
    setEditingId(item._id);
    const category = categories.find(c => c._id === item.categoryId) ||
      categories.find(c => c._id === item.categoryId?._id);
    const categoryName = category ? category.name : "";
    setFormData({
      name: item.name,
      category: categoryName,
      price: item.price,
      description: item.description,
      upsell: item.upsellSuggestions?.[0] || "",
      available: item.isAvailable,
      image: "",
    });
    setFile(null);
    setIsCreateDialogOpen(true);
  };

  const handleFormChange = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const itemsMatchingSearch = menuItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categoryNames = categories.map(c => c.name);

  const filteredItems = itemsMatchingSearch.filter((item) => {
    if (activeCategory === "Chưa phân loại") {
      return !item.categoryId;
    }
    const cat = categories.find(c => c.name === activeCategory);
    return cat && (item.categoryId === cat._id || item.categoryId?._id === cat._id);
  });

  const getCount = (catName) => {
    if (catName === "Chưa phân loại") {
      return itemsMatchingSearch.filter(i => !i.categoryId).length;
    }
    const cat = categories.find(c => c.name === catName);
    return cat ? itemsMatchingSearch.filter(item => item.categoryId === cat._id || item.categoryId?._id === cat._id).length : 0;
  };

  const handleSuggestDescription = async () => {
    if (!formData.name) {
      toast.error("Vui lòng nhập tên món ăn trước!");
      return;
    }
    setIsGenerating((prev) => ({ ...prev, description: true }));
    try {
      const prompt = `Bạn là chuyên gia ẩm thực viết copy cho menu nhà hàng. Hãy viết mô tả ngắn (30-40 từ), hấp dẫn, kích thích vị giác cho món: "${formData.name}". Chỉ trả về nội dung mô tả, không có dấu ngoặc kép hay lời dẫn.`;
      const text = await generateGeminiText(prompt);
      setFormData((prev) => ({ ...prev, description: text }));
      toast.success("Đã tạo mô tả từ Gemini!");
    } catch (error) {
      console.error("Gemini error:", error);
      toast.error("Lỗi khi tạo mô tả: " + (error.message || "Không xác định"));
    } finally {
      setIsGenerating((prev) => ({ ...prev, description: false }));
    }
  };

  const handleSuggestUpsell = async () => {
    if (!formData.name) {
      toast.error("Vui lòng nhập tên món ăn trước!");
      return;
    }
    setIsGenerating((prev) => ({ ...prev, upsell: true }));
    try {
      const prompt = `Gợi ý duy nhất 1 loại đồ uống (viết hoa chữ cái đầu) phù hợp nhất để uống kèm với món: "${formData.name}". Chỉ trả về tên đồ uống, không giải thích.`;
      const text = await generateGeminiText(prompt);
      setFormData((prev) => ({ ...prev, upsell: text }));
      toast.success("Đã tạo gợi ý đồ uống!");
    } catch (error) {
      console.error("Gemini error:", error);
      toast.error("Lỗi khi tạo gợi ý: " + (error.message || "Không xác định"));
    } finally {
      setIsGenerating((prev) => ({ ...prev, upsell: false }));
    }
  };

  const handleQuickSuggest = async (item) => {
    setGeneratingItemId(item._id);
    try {
      const prompt = `Bạn là chuyên gia ẩm thực viết copy cho menu nhà hàng. Hãy viết mô tả ngắn (30-40 từ), hấp dẫn, kích thích vị giác cho món: "${item.name}". Chỉ trả về nội dung mô tả, không có dấu ngoặc kép hay lời dẫn.`;
      const text = await generateGeminiText(prompt);
      const payload = {
        ...item,
        description: text,
        upsellSuggestions: item.upsellSuggestions || [],
      };
      const res = await updateMenuItem(item._id, payload);
      const newItem = res?.data?.data;
      if (newItem) {
        setMenuItems((prev) => prev.map((i) => (i._id === item._id ? newItem : i)));
        toast.success("Đã cập nhật mô tả mới!");
      } else {
        await fetchMenuItems();
      }
    } catch (error) {
      console.error("Quick suggest error:", error);
      toast.error("Lỗi khi tạo mô tả: " + error.message);
    } finally {
      setGeneratingItemId(null);
    }
  };

  const uncategorizedItems = itemsMatchingSearch.filter(item => !item.categoryId);

  return (
    <>
      <MenuFood
        items={filteredItems}
        uncategorizedItems={uncategorizedItems}
        categories={categoryNames}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        totalItems={itemsMatchingSearch.length}
        availableItems={itemsMatchingSearch.filter((i) => i.isAvailable).length}
        getCount={getCount}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        handleAddClick={handleAddClick}
        handleUploadFile={setFile}
        handleCreateBlog={handleSaveItem}
        menuItems={menuItems}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
        onQuickSuggest={handleQuickSuggest}
        generatingItemId={generatingItemId}
      />
      <DialogCreateMenu
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        handleCreateImage={handleSaveItem}
        handleUploadFile={setFile}
        formData={formData}
        onFormChange={handleFormChange}
        categories={categories.map(c => c.name)}
        isEditing={!!editingId}
        onImageRemove={() => {
          setFormData(prev => ({ ...prev, image: "" }));
          setFile(null);
        }}
        isCategoryOpen={isCategoryOpen}
        setIsCategoryOpen={setIsCategoryOpen}
        onSuggestDescription={handleSuggestDescription}
        onSuggestUpsell={handleSuggestUpsell}
        isGenerating={isGenerating}
      />
      <DialogDeleteConfirm
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={confirmDelete}
        title="Xóa món"
        description={`Bạn có chắc chắn muốn xóa "${deletingItem?.name}"? Hành động này không thể hoàn tác.`}
        confirmText="Xóa"
      />
    </>
  );
};

export default MenuAdminPage;