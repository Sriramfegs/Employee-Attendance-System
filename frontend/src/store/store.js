import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import attendanceReducer from "./attendanceSlice";
import dashboardReducer from "./dashboardSlice";
import managerReducer from "./managerSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    attendance: attendanceReducer,
    dashboard: dashboardReducer,
    manager: managerReducer,
  },
});

export default store;
