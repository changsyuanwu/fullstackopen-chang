import { createSlice } from "@reduxjs/toolkit"
import anecdotesService from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    updateAnecdote(state, action) {
      const updatedAnecdote = action.payload;
      return state.map(anecdote => anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote);
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    }
  }
});

export const { updateAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const notes = await anecdotesService.getAll();
    dispatch(setAnecdotes(notes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newNote = await anecdotesService.createNew(content);
    dispatch(appendAnecdote(newNote));
  };
};

export const voteAnecdote = (id) => {
  return async (dispatch, getState) => {
    const state = getState();
    const votedAnecdote = state.anecdotes.find(a => a.id === id);
    const updatedAnecdote = await anecdotesService.update(
      id,
      {
        ...votedAnecdote,
        votes: votedAnecdote.votes + 1
      });
    dispatch(updateAnecdote(updatedAnecdote));
  }
};

export default anecdoteSlice.reducer;