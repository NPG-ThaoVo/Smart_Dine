import api from "./index";

export const getMenuItems = async () => {
    return await api.get("/menu");
};

export const createMenuItem = async (data) => {
    return await api.post("/menu", data);
};

export const updateMenuItem = async (id, data) => {
    return await api.put(`/menu/${id}`, data);
};

export const deleteMenuItem = async (id) => {
    return await api.delete(`/menu/${id}`);
};

export const getAllMenu = async (params) => {
  return api.get("/menu", { params });
};
