import api from "./index";

export const getDashboardData = async () => {
    return await api.get("/dashboard");
};