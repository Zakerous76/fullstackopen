import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: { message: "", show: false },
  reducers: {
    setNotificationAction(state, action) {
      return action.payload;
    },
    resetNotification() {
      return { message: "", show: false };
    },
  },
});

export const { setNotificationAction, resetNotification } =
  notificationSlice.actions;

export const setNotification = (message, time_s) => {
  return async (dispatch) => {
    dispatch(setNotificationAction({ message, show: true }));
    setTimeout(() => {
      dispatch(resetNotification());
    }, time_s * 1000);
  };
};

export default notificationSlice.reducer;
