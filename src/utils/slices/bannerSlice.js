import { createSlice } from "@reduxjs/toolkit";

const bannerSlice = createSlice({
  name: "banner",
  initialState: {
    message: "",
    messageType: "",
  },
  reducers: {
    addBanner: (state, action) => {
      const { message, messageType } = action.payload;
      state.message = message;
      state.messageType = messageType;
    },
    hideBanner: (state) => {
      state.message = "";
      state.messageType = "";
    },
  },
});

export const { addBanner, hideBanner } = bannerSlice.actions;
export default bannerSlice.reducer;
