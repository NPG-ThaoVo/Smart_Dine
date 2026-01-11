import api from "./index";

export const getAllMenu = async (params) => {
  return api.get("/menu", { params });
};
