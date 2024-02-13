import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  isKidsMode: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state) {
      state.isAuth = true;
    },
    logout(state) {
      state.isAuth = false;
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
