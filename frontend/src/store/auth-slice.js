import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  userEmail: null,
  isAuth: false,
  isKidsMode: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      const { userId, userEmail } = action.payload;
      state.isAuth = true;
      state.userId = userId;
      state.userEmail = userEmail;
    },
    logout(state) {
      state.isAuth = false;
      state.userId = null;
    },
    activateKidsMode(state) {
      state.isKidsMode = true;
    },
    deactivateKidsMode(state) {
      state.isKidsMode = false;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
