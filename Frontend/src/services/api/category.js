import api from "./index";

export const getAllCategories = async () => {
    return await api.get("/categories");
};