import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {

    displayNotification(state, action) {
      return action.payload;
    },
    // eslint-disable-next-line no-unused-vars
    removeNotification(state, action) {
      return null;
    },
  },
});

export const { displayNotification, removeNotification } =
  notificationSlice.actions;

export const setNotification = (notification, displayDurInSecs = 5) => {
  return async (dispatch) => {
    dispatch(displayNotification(notification));
    setTimeout(() => {
      dispatch(removeNotification());
    }, displayDurInSecs * 1000);
  };
};

export default notificationSlice.reducer;
