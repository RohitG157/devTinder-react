import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import bannerReducer from "./slices/bannerSlice";
import feedReducer from "./slices/feedSlice";
import connectionsReducer from "./slices/connectionSlice";
import requestsReducer from "./slices/connectionSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    banner: bannerReducer,
    feed: feedReducer,
    connections: connectionsReducer,
    requests: requestsReducer,
  },
});

export default store;
