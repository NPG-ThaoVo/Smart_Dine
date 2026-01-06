import api from "./index";

export const login = async (data) => {
    return await api.post("/auth/login", data);
}