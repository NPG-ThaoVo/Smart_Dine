import api from "@/services/api";

export const getAllBills = ({ page = 1, limit = 20, status } = {}) => {
  return api.get("/bills", {
    params: { page, limit, status },
  });
};

export const getBillStats = () => {
  return api.get("/bills/stats");
};

export const payBill = (billId) => {
  return api.patch(`/bills/${billId}/pay`);
};
