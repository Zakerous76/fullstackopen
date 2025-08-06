import { createSlice } from "@reduxjs/toolkit"

// 7.13: Redux, Step 4
const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
  },
})

export const { setUser } = userSlice.actions
export default userSlice.reducer
