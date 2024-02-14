import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./auth-slice";
import deviceSlice from "./device-slice";

const store = configureStore({
  reducer: { auth: authSlice.reducer, device: deviceSlice.reducer },
});

export default store;
