import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};

const deviceSlice = createSlice({
  name: "device",
  initialState,
  reducers: {
    modalOpen(state) {
      state.isOpen = true;
    },
    modalClose(state) {
      state.isOpen = false;
    },
  },
});

export const deviceActions = deviceSlice.actions;

export default deviceSlice.reducer;
