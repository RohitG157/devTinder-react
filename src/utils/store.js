import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import bannerReducer from "./slices/bannerSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    banner: bannerReducer,
  },
});

export default store;
