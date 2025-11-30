import { createSlice } from "@reduxjs/toolkit";

const managerSlice = createSlice({
  name: "manager",
  initialState: {
    employees: [],
    selectedEmployee: null,
    teamCalendar: [],
    reports: [],
    loading: false
  },
  reducers: {
    setEmployees: (state, action) => {
      state.employees = action.payload;
    },
    setSelectedEmployee: (state, action) => {
      state.selectedEmployee = action.payload;
    },
    setTeamCalendar: (state, action) => {
      state.teamCalendar = action.payload;
    },
    setReports: (state, action) => {
      state.reports = action.payload;
    },
    setManagerLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const {
  setEmployees,
  setSelectedEmployee,
  setTeamCalendar,
  setReports,
  setManagerLoading
} = managerSlice.actions;

export default managerSlice.reducer;
