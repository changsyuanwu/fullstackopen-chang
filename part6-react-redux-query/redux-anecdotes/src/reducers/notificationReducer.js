import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    displayNotification(state, action) {
      return action.payload;
    },
    // eslint-disable-next-line no-unused-vars
    removeNotification(state, action) {
      return "";
    },
  },
});

export const { displayNotification, removeNotification } = notificationSlice.actions;

export const setNotification = (message, displayDurInSecs = 5) => {
  return async (dispatch) => {
    dispatch(displayNotification(message));
    setTimeout(() => {
      dispatch(removeNotification());
    }, displayDurInSecs * 1000);
  };
}

export default notificationSlice.reducer;