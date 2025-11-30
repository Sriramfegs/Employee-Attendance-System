import { createSlice } from "@reduxjs/toolkit";

let storedUser = null;

try {
  const raw = localStorage.getItem("user");
  if (raw && raw !== "undefined" && raw !== "null") {
    storedUser = JSON.parse(raw);
  }
} catch {
  storedUser = null;
  localStorage.removeItem("user");
}

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: storedUser
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  }
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
