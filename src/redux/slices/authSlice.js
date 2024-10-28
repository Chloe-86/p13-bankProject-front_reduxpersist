import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  userInfo: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.token = action.payload.token;
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.userInfo = null;
    },
  },
});

// Exports des actions
export const { setCredentials, setUserInfo, logout } = authSlice.actions;

// Export par défaut du reducer
export default authSlice.reducer;
