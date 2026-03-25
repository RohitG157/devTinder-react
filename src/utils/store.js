import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import bannerReducer from "./slices/bannerSlice";
import feedReducer from "./slices/feedSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    banner: bannerReducer,
    feed: feedReducer,
  },
});

export default store;
