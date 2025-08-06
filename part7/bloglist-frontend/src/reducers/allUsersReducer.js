import { createSlice } from "@reduxjs/toolkit"
import allUsersService from "../services/users"

const allUsersSlice = createSlice({
  name: "allUsers",
  initialState: [],
  reducers: {
    setAllUsers(state, action) {
      return action.payload
    },
  },
})

export const { setAllUsers } = allUsersSlice.actions

export const getAllUsers = () => {
  return async (dispatch) => {
    const users = await allUsersService.getAllUsers()
    console.log(users)
    dispatch(setAllUsers(users))
  }
}

export default allUsersSlice.reducer
