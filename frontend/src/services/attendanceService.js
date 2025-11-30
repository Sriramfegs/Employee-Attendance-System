import api from "./axiosInstance";

const attendanceService = {
  checkIn: () => api.post("/attendance/checkin"),
  checkOut: () => api.post("/attendance/checkout"),
  getToday: () => api.get("/attendance/today"),
  getHistory: () => api.get("/attendance/my-history"),
  getSummary: () => api.get("/attendance/my-summary")
};

export default attendanceService;
