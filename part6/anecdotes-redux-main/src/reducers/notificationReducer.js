import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: { message: "", show: false },
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    resetNotification() {
      return { message: "", show: false };
    },
  },
});

export const { setNotification, resetNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
