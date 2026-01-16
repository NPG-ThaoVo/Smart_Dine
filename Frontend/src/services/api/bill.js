import api from "./index";

export const createBill = (billData) => {
  return api.post("/bills", billData);
};

export const getAllBills = (params) => {
  return api.get("/bills", { params });
};

export const getBillById = (id) => {
  return api.get(`/bills/${id}`);
};

export const getBillByTableId = (tableId) => {
  return api.get(`/bills?tableId=${tableId}&status=PAID`);
};

export const getBillStats = () => {
  return api.get("/bills/stats");
};
