import { createSlice } from "@reduxjs/toolkit";

// Helper function to create a time-based token
const generateToken = (email) => {
  const timestamp = Date.now();
  return btoa(`${email}`);
};

const initialState = {
  token: null,
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      const { email } = action.payload.user;
      const token = generateToken(email);
      
      state.token = token;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { setLogin, logout } = authSlice.actions;
export default authSlice.reducer;
