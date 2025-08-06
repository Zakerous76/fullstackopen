import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: "notification",
  initialState: { message: "", type: "", show: false },
  reducers: {
    setNotificationAction(state, action) {
      return action.payload
    },
    resetNotification() {
      return { message: "", type: "", show: false }
    },
  },
})

export const { setNotificationAction, resetNotification } =
  notificationSlice.actions

export const setNotification = ({ message, type, time_s }) => {
  console.log("setNotification called, notReducer.js:", {
    message,
    type,
    time_s,
  })
  return async (dispatch) => {
    dispatch(setNotificationAction({ message, type, show: true }))
    setTimeout(() => {
      dispatch(resetNotification())
    }, time_s * 1000)
  }
}

export default notificationSlice.reducer
