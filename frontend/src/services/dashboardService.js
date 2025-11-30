import api from "./axiosInstance";

const dashboardService = {
  employeeStats: () => api.get("/dashboard/employee"),
  managerStats: () => api.get("/dashboard/manager")
};

export default dashboardService;
