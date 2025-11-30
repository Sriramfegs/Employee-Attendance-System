import api from "./axiosInstance.js";

const authServer = {
  login: (data) => api.post("/auth/login", data),
  register: (data) => api.post("/auth/register", data),
  getMe: () => api.get("/auth/me")
};

export default authServer;
