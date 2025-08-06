import { createSlice } from "@reduxjs/toolkit"
import blogsService from "../services/blogs"

const blogsSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      const newState = action.payload.sort((a, b) => b.likes - a.likes)
      return newState
    },
    appendBlog(state, action) {
      const newState = state.concat(action.payload)
      newState.sort((a, b) => b.likes - a.likes)
      return newState
    },
  },
})

export const { setBlogs, appendBlog } = blogsSlice.actions

export const fetchBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogsService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createNewBlog = (payload) => {
  return async (dispatch) => {
    const blog = await blogsService.create(payload)
    if (blog.code === "ERR_BAD_RESPONSE") {
      throw blog
    }
    dispatch(appendBlog(blog))
  }
}

export const updateBlogLikes = (blog) => {
  return async (dispatch) => {
    await blogsService.updateBlogLikes(blog)
    dispatch(fetchBlogs())
  }
}

export default blogsSlice.reducer
