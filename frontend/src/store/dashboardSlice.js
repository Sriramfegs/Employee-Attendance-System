import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employeeStats: null,
  managerStats: null,
  loading: false
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setEmployeeStats: (state, action) => {
      state.employeeStats = action.payload;
    },
    setManagerStats: (state, action) => {
      state.managerStats = action.payload;
    },
    setDashboardLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const {
  setEmployeeStats,
  setManagerStats,
  setDashboardLoading
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
