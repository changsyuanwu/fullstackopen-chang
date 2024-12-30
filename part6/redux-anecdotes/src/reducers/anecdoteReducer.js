import { createSlice } from "@reduxjs/toolkit"
import anecdotesService from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      const id = action.payload;
      return state.map(anecdote => anecdote.id !== id ? anecdote : { ...anecdote, votes: anecdote.votes + 1 });
    },
    createAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    }
  }
});

export const { voteAnecdote, createAnecdote, setAnecdotes } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const notes = await anecdotesService.getAll();
    dispatch(setAnecdotes(notes));
  };
};

export default anecdoteSlice.reducer;