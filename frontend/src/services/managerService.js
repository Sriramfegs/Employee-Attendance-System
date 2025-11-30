import api from "./axiosInstance";

const managerService = {
  getAllEmployees: () => api.get("/attendance/all"),
  getEmployeeById: (id) => api.get(`/attendance/employee/${id}`),
  getTeamSummary: () => api.get("/attendance/summary"),
  getTodayStatus: () => api.get("/attendance/today-status"),
  getExportData: () => api.get("/attendance/export")
};

export default managerService;
