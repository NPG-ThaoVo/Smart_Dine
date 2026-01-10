import api from "./index";

export const getAllTables = async () => {
  const response = await api.get("/tables");
  return response.data;
};

export const createTable = async (tableData) => {
  const response = await api.post("/tables", tableData);
  return response.data;
};

export const getTableById = async (tableId) => {
  const response = await api.get(`/tables/${tableId}`);
  return response.data;
};

export const updateTable = async (tableId, tableData) => {
  const response = await api.put(`/tables/${tableId}`, tableData);
  return response.data;
}

export const deleteTable = async (tableId) => {
  const response = await api.delete(`/tables/${tableId}`);
  return response.data;
};

