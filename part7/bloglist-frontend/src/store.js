import { configureStore } from "@reduxjs/toolkit"
import notificationReducer from "./reducers/notificationReducer"
import anecdotes from "../../../part6/anecdotes-redux-main/src/services/anecdotes"

const store = configureStore({
  reducer: {
    notification: notificationReducer,
  },
})

export default store
