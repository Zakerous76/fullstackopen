import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";
import axios from "axios";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    voteAction(state, action) {
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
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
  },
});
export const { appendAnecdote, voteAction, setAnecdotes } =
  anecdoteSlice.actions;

export const initializeState = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    anecdotes.sort((a, b) => b.votes - a.votes);
    dispatch(setAnecdotes(anecdotes));
  };
};
export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};
export const vote = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.incremenetVote(anecdote);
    dispatch(voteAction(updatedAnecdote.id));
  };
};

export default anecdoteSlice.reducer;
