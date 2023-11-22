import { api } from "../route/axiosConfig";

export const AuthAPI = {
  login: async (payload) => {
    const { data } = await api.post(`/login`, payload);
    console.log("data", data);
  },
};
