import { createSlice } from "@reduxjs/toolkit";

// Already did
const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      return state.concat(action.payload);
    },
    vote(state, action) {
      const id = action.payload;
      const newState = state.map((anecdote) => {
        return anecdote.id === id
          ? { ...anecdote, votes: anecdote.votes + 1 }
          : anecdote;
      });
      return newState.sort((a, b) => b.votes - a.votes);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});
export const { createAnecdote, vote, setAnecdotes } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
