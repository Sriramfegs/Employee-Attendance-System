import { createSlice } from "@reduxjs/toolkit";

const attendanceSlice = createSlice({
  name: "attendance",
  initialState: {
    today: null,
    history: [],
    summary: null,
    loading: false
  },
  reducers: {
    setToday: (state, action) => {
      state.today = action.payload;
    },
    setHistory: (state, action) => {
      state.history = action.payload;
    },
    setSummary: (state, action) => {
      state.summary = action.payload;
    },
    setAttendanceLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const { setToday, setHistory, setSummary, setAttendanceLoading } =
  attendanceSlice.actions;

export default attendanceSlice.reducer;
