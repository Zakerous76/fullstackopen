import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

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

export const initializeState = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export default anecdoteSlice.reducer;
